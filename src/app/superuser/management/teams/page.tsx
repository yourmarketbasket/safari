"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import { usePageTitleStore } from "@/app/store/pageTitle.store";
import { DataTable, ColumnDef } from "@/app/components/DataTable";
import { Team } from "@/app/models/Team.model";
import superuserService from "@/app/services/superuser.service";
import LoadingOverlay from "@/app/components/LoadingOverlay";
import Message from "@/app/components/Message";
import { FiPlus, FiEdit, FiTrash2, FiUsers } from "react-icons/fi";
import { User } from "@/app/models/User.model";
import TeamModal from "@/app/components/TeamModal";
import ManageTeamMembersModal from "@/app/components/ManageTeamMembersModal";

const TeamsPage: NextPage = () => {
    const { setTitle } = usePageTitleStore();
    const [teams, setTeams] = useState<Team[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);
    const [teamToEdit, setTeamToEdit] = useState<Team | null>(null);
    const [teamToManage, setTeamToManage] = useState<Team | null>(null);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [teamsData, usersData] = await Promise.all([
                superuserService.getAllTeams(),
                superuserService.getAllUsers(),
            ]);
            setTeams(teamsData);
            setUsers(usersData);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Failed to fetch data.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setTitle("Team Management");
        fetchData();
    }, [setTitle]);

    const handleOpenModal = (team?: Team) => {
        setTeamToEdit(team || null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setTeamToEdit(null);
        setIsModalOpen(false);
    };

    const handleSaveTeam = (savedTeam: Team) => {
        if (teamToEdit) {
            setTeams(teams.map(t => t._id === savedTeam._id ? savedTeam : t));
        } else {
            setTeams([...teams, savedTeam]);
        }
    };

    const handleDeleteTeam = async (teamId: string) => {
        if (window.confirm("Are you sure you want to delete this team?")) {
            try {
                await superuserService.deleteTeam(teamId);
                setTeams(teams.filter(t => t._id !== teamId));
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Failed to delete team.");
                }
            }
        }
    };

    const handleOpenMembersModal = (team: Team) => {
        setTeamToManage(team);
        setIsMembersModalOpen(true);
    };

    const handleTeamUpdate = (updatedTeam: Team) => {
        setTeams(teams.map(t => t._id === updatedTeam._id ? updatedTeam : t));
    };

    const columns: ColumnDef<Team>[] = [
      { header: "Name", accessorKey: "name" },
      { header: "Team Lead", accessorKey: "teamLead", cell: (row) => row.teamLead.name },
      { header: "Members", accessorKey: "members", cell: (row) => row.members.length },
      {
          header: "Actions",
          accessorKey: "_id",
          cell: (row) => (
              <div className="flex gap-2">
                  <button onClick={() => handleOpenModal(row)} className="text-xs bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 flex items-center gap-1"><FiEdit /> Edit</button>
                  <button onClick={() => handleDeleteTeam(row._id)} className="text-xs bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 flex items-center gap-1"><FiTrash2 /> Delete</button>
                  <button onClick={() => handleOpenMembersModal(row)} className="text-xs bg-gray-500 text-white px-2 py-1 rounded-md hover:bg-gray-600 flex items-center gap-1"><FiUsers /> Members</button>
              </div>
          )
      }
    ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      {isLoading && <LoadingOverlay />}

      <div className="mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
            <div>
                <h2 className="text-xl font-bold">Team Management</h2>
                <p className="text-gray-600 mt-1">Create and manage teams.</p>
            </div>
            <button onClick={() => handleOpenModal()} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2">
                <FiPlus /> Create Team
            </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Teams</h2>
        {error && <Message type="error" message={error} />}
        {!isLoading && !error && <DataTable data={teams} columns={columns} filterColumn="name" />}
      </div>

      <TeamModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTeam}
        teamToEdit={teamToEdit}
        users={users}
      />

      <ManageTeamMembersModal
        isOpen={isMembersModalOpen}
        onClose={() => setIsMembersModalOpen(false)}
        onTeamUpdate={handleTeamUpdate}
        team={teamToManage}
        users={users}
      />
    </div>
  );
};

export default TeamsPage;
