import * as IPA_Service from '../utils/ipa_info.js';
import * as Wiki_Service from '../utils/generate_wikitable.js';
import TableCell from './TableCell';
import "../styles/table.css";
import { React, useState } from 'react';

const getTableHeaders = () => {
    const list = [<th key="intro"> <b> Manner and Place </b></th>];
    list.push(IPA_Service.places.map((place, key) => (<th key={key}> <b> {place} </b> </th>)))
    return list;
};


const Table = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [tableResult, setTableResult] = useState('');
    const [languageName, setLanguageName] = useState('');

    const handleClick = (symbol, action) => {
        if (action === 'REMOVE') {
            const newArray = selectedOptions.filter((ele) => ele.symbol !== symbol.symbol);
            setSelectedOptions(newArray);
        } else if (selectedOptions.findIndex((ele) => ele.symbol === symbol.symbol) === -1) {
            const newArray = selectedOptions.concat([symbol]);
            setSelectedOptions(newArray);
        }
    };

    const getTableBody = () => {
        const rows = [];
        for (let manner of IPA_Service.manners) {
            const columns = [<td> {manner} </td>];
            for (let place of IPA_Service.places)  {
                columns.push(
                    <td key={place + manner}> 
                        <TableCell 
                            manner={manner} 
                            place={place}
                            handleClick={handleClick}
                        /> 
                    </td>
                );
            };
            rows.push(<tr key={manner + '-row'}> {columns} </tr>);
        };
        return rows;
    };    

    const generateTable = () => {
        if (selectedOptions.length !== 0) {
            const table = Wiki_Service.getWikiTable(selectedOptions, languageName);
            setTableResult(table);
        }
    };

    const onCopy = () => {
        navigator.clipboard.writeText(tableResult);
    };

    const onClear = () => {
        window.location.reload(false);
    };

    return (
        <div>
            <table cellSpacing="1" cellPadding="5%" width="300px" height="500px">
                <tbody> 
                    <tr>
                        { getTableHeaders() }
                    </tr>
                    { getTableBody() } 
                </tbody>
            </table>
            <br />
            Selected symbols: { selectedOptions.map((e) => e.symbol).join(', ') }
            <br />
            Name of language: <input type="text" onChange={(e) => setLanguageName(e.target.value)} />
            <br />
            <br />
            <button onClick={generateTable}> Generate Table </button> {'  '} <button onClick={onCopy}> Copy </button> {'  '} <button onClick={onClear}> Clear </button>
            <br />
            <br />
            {
                tableResult.length > 0 &&  
                <textarea style={{ whiteSpace: 'pre-line', width: '380px', height: '100px' }} defaultValue={tableResult} />
            }
        </div>
    );
};

export default Table;