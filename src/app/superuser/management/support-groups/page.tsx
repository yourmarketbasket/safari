"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import { usePageTitleStore } from "@/app/store/pageTitle.store";
import { DataTable, ColumnDef } from "@/app/components/DataTable";
import { SupportGroup } from "@/app/models/SupportGroup.model";
import { User } from "@/app/models/User.model";
import superuserService from "@/app/services/superuser.service";
import LoadingOverlay from "@/app/components/LoadingOverlay";
import Message from "@/app/components/Message";
import { FiPlus, FiEdit, FiTrash2, FiUsers } from "react-icons/fi";
import SupportGroupModal from "@/app/components/SupportGroupModal";
import ManageSupportGroupMembersModal from "@/app/components/ManageSupportGroupMembersModal";
import { Button } from "@/app/components/ui/Button";
import Pagination from "@/app/components/Pagination";

const SupportGroupsPage: NextPage = () => {
    const { setTitle } = usePageTitleStore();
    const [supportGroups, setSupportGroups] = useState<SupportGroup[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);
    const [groupToEdit, setGroupToEdit] = useState<SupportGroup | null>(null);
    const [groupToManage, setGroupToManage] = useState<SupportGroup | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [groupsData, usersData] = await Promise.all([
                superuserService.getAllSupportGroups(),
                superuserService.getAllUsers(),
            ]);
            setSupportGroups(groupsData);
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
        setTitle("Support Group Management");
        fetchData();
    }, [setTitle]);

    const handleOpenModal = (group?: SupportGroup) => {
        setGroupToEdit(group || null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setGroupToEdit(null);
        setIsModalOpen(false);
    };

    const handleSaveGroup = (savedGroup: SupportGroup) => {
        if (groupToEdit) {
            setSupportGroups(supportGroups.map(g => g._id === savedGroup._id ? savedGroup : g));
        } else {
            setSupportGroups([...supportGroups, savedGroup]);
        }
    };

    const handleDeleteGroup = async (groupId: string) => {
        if (window.confirm("Are you sure you want to delete this support group?")) {
            try {
                await superuserService.deleteSupportGroup(groupId);
                setSupportGroups(supportGroups.filter(g => g._id !== groupId));
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Failed to delete support group.");
                }
            }
        }
    };

    const handleOpenMembersModal = (group: SupportGroup) => {
        setGroupToManage(group);
        setIsMembersModalOpen(true);
    };

    const handleGroupUpdate = (updatedGroup: SupportGroup) => {
        setSupportGroups(supportGroups.map(g => g._id === updatedGroup._id ? updatedGroup : g));
    };

    const columns: ColumnDef<SupportGroup>[] = [
      { header: "Name", accessorKey: "name" },
      { header: "Supervisor", accessorKey: "supervisor", cell: (row) => row.supervisor.name },
      { header: "Members", accessorKey: "members", cell: (row) => row.members.length },
      {
          header: "Actions",
          accessorKey: "_id",
          cell: (row) => (
              <div className="flex gap-2">
                  <Button onClick={() => handleOpenModal(row)} size="sm"><FiEdit /> Edit</Button>
                  <Button onClick={() => handleDeleteGroup(row._id)} size="sm" variant="danger"><FiTrash2 /> Delete</Button>
                  <Button onClick={() => handleOpenMembersModal(row)} size="sm" variant="secondary"><FiUsers /> Members</Button>
              </div>
          )
      }
    ];

    const totalPages = Math.ceil(supportGroups.length / itemsPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      {isLoading && <LoadingOverlay />}

      <div className="mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
            <div>
                <h2 className="text-xl font-bold">Support Group Management</h2>
                <p className="text-gray-600 mt-1">Create and manage support groups.</p>
            </div>
            <Button onClick={() => handleOpenModal()}>
                <FiPlus /> Create Support Group
            </Button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Support Groups</h2>
        {error && <Message type="error" message={error} />}
        {!isLoading && !error && (
            <>
                <DataTable
                    data={supportGroups}
                    columns={columns}
                    filterColumn="name"
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={setItemsPerPage}
                />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    onItemsPerPageChange={setItemsPerPage}
                />
            </>
        )}
      </div>

      <SupportGroupModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveGroup}
        groupToEdit={groupToEdit}
        users={users}
      />

      <ManageSupportGroupMembersModal
        isOpen={isMembersModalOpen}
        onClose={() => setIsMembersModalOpen(false)}
        onGroupUpdate={handleGroupUpdate}
        group={groupToManage}
        users={users}
      />
    </div>
  );
};

export default SupportGroupsPage;
