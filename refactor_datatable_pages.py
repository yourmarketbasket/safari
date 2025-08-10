import os
import re

def refactor_datatable_pages():
    grep_command = 'grep -r "<DataTable" src'
    files_to_refactor = os.popen(grep_command).read().split('\n')
    files_to_refactor = [f.split(':')[0] for f in files_to_refactor if f and 'src/app/components/DataTable.tsx' not in f]
    files_to_refactor = sorted(list(set(files_to_refactor)))

    for filepath in files_to_refactor:
        print(f"Refactoring {filepath}...")
        with open(filepath, 'r') as f:
            content = f.read()

        # Add imports
        if "import { useEffect } from" in content:
            content = content.replace("import { useEffect } from", "import { useEffect, useState } from")
        elif "import { useEffect, useMemo } from" in content:
            content = content.replace("import { useEffect, useMemo } from", "import { useEffect, useMemo, useState } from")
        else:
            print(f"Could not find useEffect import in {filepath}")

        if "import { DataTable, ColumnDef } from" in content:
            content = content.replace(
                'import { DataTable, ColumnDef } from "@/app/components/DataTable";',
                'import { DataTable, ColumnDef } from "@/app/components/DataTable";\nimport Pagination from "@/app/components/Pagination";'
            )

        # Add state
        state_to_add = """
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
"""
        # find the line with usePageTitleStore and add the state after it
        content_lines = content.split('\n')
        for i, line in enumerate(content_lines):
            if "usePageTitleStore" in line:
                content_lines.insert(i + 1, state_to_add)
                break
        content = '\n'.join(content_lines)

        # Add totalPages
        # find the line with useEffect and add the totalPages after it
        content_lines = content.split('\n')
        for i, line in enumerate(content_lines):
            if "}, [setTitle]);" in line:
                # get the name of the data variable
                data_variable_name = re.search(r'data=\{([^}]+)\}', content)
                if data_variable_name:
                    data_variable_name = data_variable_name.group(1)
                    content_lines.insert(i + 1, f"  const totalPages = Math.ceil({data_variable_name}.length / itemsPerPage);")
                    break
        content = '\n'.join(content_lines)

        # Update DataTable
        datatable_regex = re.compile(r'(<DataTable\s+[^>]*?data=\{([^}]+)\}[^>]*?/>)')
        match = datatable_regex.search(content)
        if match:
            original_datatable_tag = match.group(1)
            data_variable_name = match.group(2)

            new_datatable_tag = f"""<DataTable
            data={{{data_variable_name}}}
            columns={{columns}}
            filterColumn="status"
            currentPage={{currentPage}}
            itemsPerPage={{itemsPerPage}}
            onPageChange={{setCurrentPage}}
            onItemsPerPageChange={{setItemsPerPage}}
        />"""
            content = content.replace(original_datatable_tag, new_datatable_tag)

            # Add Pagination
            pagination_component = f"""<Pagination
            currentPage={{currentPage}}
            totalPages={{totalPages}}
            onPageChange={{setCurrentPage}}
            itemsPerPage={{itemsPerPage}}
            onItemsPerPageChange={{setItemsPerPage}}
        />"""
            content = content.replace(new_datatable_tag, new_datatable_tag + '\n' + pagination_component)

        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Finished refactoring {filepath}")

if __name__ == '__main__':
    refactor_datatable_pages()
