const TableLayout = [
    ["H", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "He"],
    ["Li", "Be", "", "", "", "", "", "", "", "", "", "", "", "B", "C", "N", "O", "F", "Ne"],
    ["Na", "Mg", "", "", "", "", "", "", "", "", "", "", "", "Al", "Si", "P", "S", "Cl", "Ar"],
    ["K", "Ca", "Sc", ".", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr"],
    ["Rb", "Sr", "Y", ".", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I", "Xe"],
    ["Cs", "Ba", "La", ".", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At", "Rn"],
    ["Fr", "Ra", "Ac", ".", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts", "Og"],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    ["", "OH", "", "NP", "", "CN", "", "RO", "", "OBr", "", "OCl", "", "SCN", "", "NCS", "", "OCN", ""]
]

const M_Values = ["Sc", "Ti", "V", "Cr", "Y", "Zr", "Nb", "Mo", "Hf", "Ta", "W"] // 11 elements
const X_Values = ["C", "N"] // 2 elements
const T_Values = ["H", "O", "F", "Cl", "Br", "OH", "NP", "CN", "RO", "OBr", "OCl", "SCN", "NCS", "OCN"] // 14 elements

const FunctionalGroups = ['NCS', 'SH', 'NO', 'OH', 'PH', 'NCO', 'Cl', 'OCN', 'Se', 'F', 'SCN', 'S', 'O', 'I', 'Te', 'NC', 'Br', 'CN', 'NH'];
const Metals = ['Bi', 'Cr', 'La', 'W', 'Zn', 'Ga', 'Pt', 'Cu', 'Y', 'Rh', 'Ru', 'Hf', 'Sn', 'Mo', 'Al', 'Tc', 'Os', 'Fe', 'Zr', 'Sm', 'Lu', 'Ce', 'Be', 'Ba', 'Sc', 'Re', 'Ge', 'Ti', 'Cd', 'Pb', 'Ni', 'Sr', 'Ca', 'Nd', 'Ir', 'Te', 'In', 'Pd', 'Mn', 'Gd', 'Mg', 'Co'];

const E_values = ['Cd', 'Co', 'Zn', 'O'];

export { TableLayout, M_Values, X_Values, T_Values, FunctionalGroups, Metals, E_values }