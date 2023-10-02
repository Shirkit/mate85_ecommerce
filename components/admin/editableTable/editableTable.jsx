"use client"
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import EditableCell from './editableCell';

export default function EditableTable(props) {
    const [data, setData] = useState(props.data)
    const [editedRows, setEditedRows] = useState([])

    return (
        <table class="w-full text-sm text-center text-gray-400">
            <thead class="text-xs uppercase bg-gray-700 text-gray-400">
                <tr>
                    {props.headers.map((header) => (
                        <th key={header} scope="col" class="px-6 py-3 w-fit">
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex} class="border-b bg-gray-800 border-gray-700">
                        {Object.keys(row).map(key => {
                            const initialValue = [...props.data]
                            return (
                            <td key={key} class="px-6 py-4">
                                <EditableCell 
                                    initialValue={initialValue[rowIndex][key]} 
                                    setEditedRows={setEditedRows}    
                                    rowIndex={rowIndex}
                                    editedRows={editedRows}
                                    setData={setData}
                                    cellKey={key}
                                />
                            </td>
                        )})}
                        <td class="px-6 py-4">
                            <Button 
                                disabled={!(editedRows.includes(rowIndex))}
                                variant="form"
                            >
                                {props.action.name}
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}