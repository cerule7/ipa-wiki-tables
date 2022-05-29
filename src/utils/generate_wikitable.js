import * as IPA_Service from './ipa_info.js';

export const getWikiTable = (symbols) => { 
    const table = [];
    table.push(getTableHeader());
    const columnHeaders = getTableColumHeaders(symbols);
    table.push(columnHeaders);
    const uniquePlaces = [...new Set(symbols.map((e) => e.place))];
    table.push(getTableRows(symbols, uniquePlaces));
    table.push('|} \n');
    return table.join('\n');
};

const getTableHeader = () => {
    return (`{| class="wikitable" style="text-align:center"\n|+ Consonants`);
};

const getTableRows = (symbols, columns) => {
    const rows = [];
    for (let manner of IPA_Service.manners) {
        const row = [];
        if (symbols.findIndex((e) => e.manner === manner) !== -1) {
            row.push('|-');
            row.push(`| ${getMannerLink(manner)}`);
            for (let place of IPA_Service.places) {
                if (columns.indexOf(place) !== -1) {
                    const symbol = symbols.filter((s) => s.place === place && s.manner === manner);
                    row.push(convertSymbolToCell(symbol));
                }
            }
            rows.push(row.join('\n'));
        } 
    }
    return rows.join('\n');
};

const convertSymbolToCell = (symbol) => {
    if (symbol.length === 1) {
        return (`| ${getSymbolLink(symbol[0])}`);
    } else if (symbol.length === 2) {
        const voiced = symbol.filter((s) => s.voiced === true);
        const voiceless = symbol.filter((s) => s.voiced === false);
        return (`| ${getSymbolLink(voiceless[0])} ${getSymbolLink(voiced[0])}`);
    } 
    return('| ');
};

const getSymbolLink = (symbol) => {
    if (symbol.url === '') return `${symbol.symbol}`;
    const name = symbol.url.split("/wiki/")[1].split("_").join(" ");
    return "[[" + name + "| " + symbol.symbol + "]]";
};

const getTableColumHeaders = (symbols) => {
    const rows = ["!"];
    for (let place of IPA_Service.places) {
        if (symbols.findIndex((e) => e.place === place) !== -1) {
            rows.push(`! ${ getPlaceLink(place) }`);
        }
    }
    return rows.join('\n');
};

const getPlaceLink = (place) => {
    switch (place) {
        case 'BILABIAL':
            return "[[Bilabial consonant|Bilabial]]";
        case 'LABIODENTAL':
            return "[[Labiodental consonant|Labio-dental]]";                 
        case 'LINGUOLABIAL':          
            return "[[Linguolabial consonant|Linguo-labial]]";                 
        case 'DENTAL':                   
            return "[[Dental consonant|Dental]]";                 
        case 'ALVEOLAR':          
            return "[[Alveolar consonant|Alveolar]]";                 
        case 'POSTALVEOLAR':           
            return "[[Postalveolar consonant|Post-alveolar]]";                 
        case 'RETROFLEX':           
            return "[[Retroflex consonant|Retroflex]]";                 
        case 'PALATAL':           
            return "[[Palatal consonant|Palatal]]";   
        case 'LABIALVELAR':
            return "[[Labial–velar consonant|Labial–velar]]";
        case 'VELAR':          
            return "[[Velar consonant|Velar]]";                 
        case 'UVULAR':           
            return "[[Uvular consonant|Uvular]]";                 
        case 'PHARYNGEAL/EPIGLOTTAL':           
            return "[[Pharyngeal consonant|Pharyngeal/Epiglottal]]";                 
        case 'GLOTTAL':           
            return "[[Glottal consonant|Glottal]]";                 
        default:
            return place;
    };
};

const getMannerLink = (manner) => {
    switch (manner) {
        case 'NASAL':
            return "[[Nasal consonant|Nasal]]";
        case 'PLOSIVE':
            return "[[Plosive]]";  
        case 'IMPLOSIVE':
            return "[[Implosive consonant|Implosive]]";               
        case 'SIBILANT AFFRICATE':          
            return "[[Sibilant]] [[affricate]]";                 
        case 'NON-SIBILANT AFFRICATE':                   
            return "Non-sibilant affricate";                 
        case 'SIBILANT FRICATIVE':          
            return "Sibilant [[fricative]]";                 
        case 'NON-SIBILANT FRICATIVE':           
            return "Non-sibilant fricative";                 
        case 'APPROXIMANT':           
            return "[[Approximant]]";                 
        case 'TAP/FLAP':           
            return "[[Tap and flap consonants|Tap/flap]]";                 
        case 'TRILL':          
            return "[[Trill consonant|Trill]]";                 
        case 'LATERAL AFFRICATE':           
            return "[[Lateral consonant|Lateral]] affricate";                 
        case 'LATERAL FRICATIVE':           
            return "Lateral fricative";                 
        case 'LATERAL APPROXIMANT':           
            return "Lateral approximant";          
        case 'LATERAL TAP/FLAP':           
            return "Lateral tap/flap";                        
        default:
            return manner;
    };
};