import * as IPA_Service from '../utils/ipa_info.js';
import SymbolBlock from './SymbolBlock.js';

const TableCell = (symbolInfo) => {
    const symbols = IPA_Service.IPA_SYMBOLS.filter((symbol) => {
        return (symbol.manner === symbolInfo.manner && symbol.place === symbolInfo.place);
    });
    if (symbols.length === 0) return null;
    return (<SymbolBlock symbols={symbols} handleClick={symbolInfo.handleClick} />);
};

export default TableCell;