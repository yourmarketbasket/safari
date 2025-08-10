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
        if "useState" not in content:
            if "useEffect" in content:
                content = content.replace("import { useEffect", "import { useEffect, useState")
            elif "useMemo" in content:
                content = content.replace("import { useMemo", "import { useMemo, useState")

        if "Pagination" not in content:
            content = content.replace(
                'import { DataTable, ColumnDef } from "@/app/components/DataTable";',
                'import { DataTable, ColumnDef } from "@/app/components/DataTable";\nimport Pagination from "@/app/components/Pagination";'
            )

        # Find component function
        component_match = re.search(r'const\s+(\w+)\s*:\s*NextPage\s*=\s*\(\)\s*=>\s*{', content)
        if component_match:
            component_name = component_match.group(1)

            # Add state
            state_to_add = """
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
"""
            content = content.replace(
                f"const {{ setTitle }} = usePageTitleStore();",
                f"const {{ setTitle }} = usePageTitleStore();{state_to_add}"
            )

            # Add totalPages
            data_variable_name_match = re.search(r'data=\{([^}]+)\}', content)
            if data_variable_name_match:
                data_variable_name = data_variable_name_match.group(1)
                total_pages_to_add = f"  const totalPages = Math.ceil({data_variable_name}.length / itemsPerPage);"
                content = content.replace(
                    "useEffect(() => {",
                    f"{total_pages_to_add}\n\n  useEffect(() => {{"
                )

            # Update DataTable and add Pagination
            datatable_regex = re.compile(r'(<DataTable\s+[^>]*?/>)')
            match = datatable_regex.search(content)
            if match:
                original_datatable_tag = match.group(1)

                new_datatable_tag = original_datatable_tag.replace("/>", """
            currentPage={{currentPage}}
            itemsPerPage={{itemsPerPage}}
            onPageChange={{setCurrentPage}}
            onItemsPerPageChange={{setItemsPerPage}}
        />""")

                pagination_component = f"""<Pagination
            currentPage={{currentPage}}
            totalPages={{totalPages}}
            onPageChange={{setCurrentPage}}
            itemsPerPage={{itemsPerPage}}
            onItemsPerPageChange={{setItemsPerPage}}
        />"""

                if "</>" in content:
                     content = content.replace(new_datatable_tag, new_datatable_tag + '\n' + pagination_component)
                else:
                    content = content.replace(original_datatable_tag, f"<> {new_datatable_tag}\n{pagination_component} </>")


        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Finished refactoring {filepath}")

if __name__ == '__main__':
    refactor_datatable_pages()
