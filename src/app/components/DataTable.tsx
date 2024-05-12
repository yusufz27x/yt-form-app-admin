import * as React from 'react';
import {
  DataGrid,
  GridRowId,
  GridValidRowModel,
  DataGridProps,
  useGridApiRef,
  GridActionsCellItem,
  GridColDef,
} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

export default function BulkEditingNoSnap() {
  const placeholderColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70, editable: true},
    { field: "name", headerName: "Full name", width: 160, editable: true},
    { field: "school_number", headerName: "Student Number", width: 160, editable: true},
    { field: "email", headerName: "Email", width: 160, editable: true},
    { field: "department", headerName: "Department", width: 160, editable: true},
    { field: "school", headerName: "School", width: 160, editable: true},
    { field: "board", headerName: "Board", width: 160, editable: true},
    { field: "role", headerName: "Role", width: 160, editable: true},
    { field: "phone", headerName: "Phone", width: 160, editable: true},
  ];

  const [placeholderRows, setPlaceholderRows] = React.useState([
    {
      id: 1,
      name: "John Doe",
      school_number: "12345",
      email: "john@example.com",
      department: "Computer Science",
      school: "University of Example",
      board: "Example Board",
      role: "Student",
      phone: "123-456-7890",
    },
    {
      id: 2,
      name: "Jane Smith",
      school_number: "54321",
      email: "jane@example.com",
      department: "Engineering",
      school: "Another University",
      board: "Another Board",
      role: "Faculty",
      phone: "987-654-3210",
    },
    // Add more placeholder rows as needed
  ]);

  const apiRef = useGridApiRef();

  const [hasUnsavedRows, setHasUnsavedRows] = React.useState(false);
  const unsavedChangesRef = React.useRef<{
    unsavedRows: Record<GridRowId, GridValidRowModel>;
    rowsBeforeChange: Record<GridRowId, GridValidRowModel>;
  }>({
    unsavedRows: {},
    rowsBeforeChange: {},
  });
  const [isSaving, setIsSaving] = React.useState(false);

  const columns = React.useMemo<GridColDef[]>(() => {
    return [
      {
        field: 'actions',
        headerName: 'Actions',
        renderCell: ({ id,row }) => {
          return [
            <GridActionsCellItem
              key={`restore-${id}`}
              icon={<RestoreIcon />}
              label="Discard changes"
              disabled={unsavedChangesRef.current.unsavedRows[id] === undefined}
              onClick={() => {
                apiRef.current.updateRows([
                  unsavedChangesRef.current.rowsBeforeChange[id],
                ]);
                delete unsavedChangesRef.current.rowsBeforeChange[id];
                delete unsavedChangesRef.current.unsavedRows[id];
                setHasUnsavedRows(
                  Object.keys(unsavedChangesRef.current.unsavedRows).length > 0,
                );
              }}
            />,
            <GridActionsCellItem
              key={`delete-${id}`}
              icon={<DeleteIcon />}
              label="Delete"
              onClick={() => {
                unsavedChangesRef.current.unsavedRows[id] = {
                  ...row,
                  _action: 'delete',
                };
                if (!unsavedChangesRef.current.rowsBeforeChange[id]) {
                  unsavedChangesRef.current.rowsBeforeChange[id] = row;
                }
                handleDeleteRow(id);
                apiRef.current.updateRows([row]); // to trigger row render
              }}
            />,
            ];
        },
      },
      ...placeholderColumns,
    ];
  }, [placeholderColumns, unsavedChangesRef, apiRef]);

  const handleDeleteRow = (id: GridRowId) => {
    const index = placeholderRows.findIndex(row => row.id === id);
    const updatedRows = placeholderRows.filter(row => row.id !== id);
    setPlaceholderRows(updatedRows);
    setHasUnsavedRows(true);
    return index;
  };

  const processRowUpdate: NonNullable<DataGridProps['processRowUpdate']> = (
    newRow,
    oldRow,
  ) => {
    const rowId = newRow.id;

    unsavedChangesRef.current.unsavedRows[rowId] = newRow;
    if (!unsavedChangesRef.current.rowsBeforeChange[rowId]) {
      unsavedChangesRef.current.rowsBeforeChange[rowId] = oldRow;
    }
    setHasUnsavedRows(true);
    return newRow;
  };

  const discardChanges = () => {
    setHasUnsavedRows(false);
    apiRef.current.updateRows(
      Object.values(unsavedChangesRef.current.rowsBeforeChange),
    );
    unsavedChangesRef.current = {
      unsavedRows: {},
      rowsBeforeChange: {},
    };
  };

  const saveChanges = async () => {
    try {
      // Persist updates in the database
      setIsSaving(true);
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });

      setIsSaving(false);
      const rowsToDelete = Object.values(
        unsavedChangesRef.current.unsavedRows,
      ).filter((row) => row._action === 'delete');
      if (rowsToDelete.length > 0) {
        apiRef.current.updateRows(rowsToDelete);
      }

      setHasUnsavedRows(false);
      unsavedChangesRef.current = {
        unsavedRows: {},
        rowsBeforeChange: {},
      };
    } catch (error) {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: 8 }}>
        <LoadingButton
          disabled={!hasUnsavedRows}
          loading={isSaving}
          onClick={saveChanges}
          startIcon={<SaveIcon />}
          loadingPosition="start"
        >
          <span>Save</span>
        </LoadingButton>
        <Button
          disabled={!hasUnsavedRows || isSaving}
          onClick={discardChanges}
          startIcon={<RestoreIcon />}
        >
          Discard all changes
        </Button>
      </div>
      <div style={{ height: 400 }}>
        <DataGrid
          rows = {placeholderRows}
          columns={columns}
          apiRef={apiRef}
          disableRowSelectionOnClick
          processRowUpdate={processRowUpdate}
          ignoreValueFormatterDuringExport
          className="data-grid-root"
          loading={isSaving}
          getRowClassName={({ id }) => {
            const unsavedRow = unsavedChangesRef.current.unsavedRows[id];
            if (unsavedRow) {
              if (unsavedRow._action === 'delete') {
                return 'row--removed';
              }
              return 'row--edited';
            }
            return '';
          }}
        />
      </div>
    </div>
  );
}
