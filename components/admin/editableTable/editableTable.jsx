"use client"
import { Button } from '@/components/ui/button';
import {  useState, } from 'react';
import EditableCell from './editableCell';
import { Edit2Icon } from 'lucide-react';

export default function EditableTable(props) {
    const [data, setData] = useState(props.data)
    const [editedRows, setEditedRows] = useState([])
    

    const handleRowChange = async (e) => {
        const row = e.target.getAttribute("row")
        console.log(data[row])
        props.action(data[row]) //TODO converter para uma unica funcao
    }


    return (
        <table class="w-full text-sm text-center text-zinc-600">
            <thead class="text-xs uppercase bg-neutral-200 text-zinc-900">
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
                    <tr key={rowIndex} class="border-b bg-white border-neutral-300">
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
                            )
                        })}
                        <td class="px-6 py-4">
                            <Button
                                row = {rowIndex}
                                disabled={!(editedRows.includes(rowIndex))}
                                variant="form"
                                onClick = {handleRowChange}
                            >
                                <Edit2Icon row = {rowIndex}></Edit2Icon>
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}