import { React, useState } from 'react';

const SymbolBlock = ({ symbols, handleClick }) => {
    const [selectedOptions, setSelectedOptions] = useState([false, false]);

    const SymbolLink = ({ symbol }) => {
        return symbol.symbol;
    };

    const getOptions = (symbols) => {
        let leftOption, rightOption;
        if (symbols.length < 1) return [' ', ' '];
        if (symbols.length === 1) {
            if (symbols[0].voiced === true) {
                leftOption = ' ';
                rightOption =  <SymbolLink symbol={symbols[0]} />;
            } else {
                leftOption =  <SymbolLink symbol={symbols[0]} />;
                rightOption = ' ';
            }
        } else {
            leftOption = <SymbolLink symbol={symbols[0]} />;
            rightOption = <SymbolLink symbol={symbols[1]} />;
        }
        return [leftOption, rightOption];
    };

    const optionsList = getOptions(symbols);

    const handleOnClick = (clickedOption) => {
        let action = 'REMOVE';
        if (clickedOption === 'LEFT') {
            setSelectedOptions([!selectedOptions[0], selectedOptions[1]]);
            if (selectedOptions[0] === false) {
                action = 'ADD';
            }
            handleClick(symbols[0], action);
        } else {
            setSelectedOptions([selectedOptions[0], !selectedOptions[1]]);
            if (selectedOptions[1] === false) {
                action = 'ADD';
            } 
            if (symbols.length > 1) handleClick(symbols[1], action);
            else handleClick(symbols[0], action);
        } 
    };

    const leftStyle = selectedOptions[0] === true ? { backgroundColor: 'lightgray' } : { backgroundColor: 'white' };
    const rightStyle = selectedOptions[1] === true ? { backgroundColor: 'lightgray' } : { backgroundColor: 'white' };

    return (
        <div class="centered"> 
            <tr> 
                <td onClick={() => handleOnClick("LEFT")} style={leftStyle}> 
                    {optionsList[0]} 
                </td> 
                 <td onClick={() => handleOnClick("RIGHT")} style={rightStyle}> 
                    {optionsList[1]} 
                </td> 
            </tr> 
        </div>
    );
};
export default SymbolBlock;