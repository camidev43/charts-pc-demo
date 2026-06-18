export const patientStats = {
  total: 247,
  riskHigh: 34,
  riskMedium: 43,
  riskLow: 23,
  avgBMI: 28.4,
  avgAge: 47,
  avgGlucose: 112,
  monthlyNew: 18,
  monthlyIncrease: 12,
};

export const monthlyBMI = [
  { month: 'Ene', avg: 27.2 },
  { month: 'Feb', avg: 27.8 },
  { month: 'Mar', avg: 28.1 },
  { month: 'Abr', avg: 27.9 },
  { month: 'May', avg: 28.4 },
  { month: 'Jun', avg: 28.6 },
  { month: 'Jul', avg: 29.0 },
  { month: 'Ago', avg: 28.7 },
  { month: 'Sep', avg: 28.9 },
  { month: 'Oct', avg: 29.2 },
  { month: 'Nov', avg: 29.0 },
  { month: 'Dic', avg: 28.4 },
];

export const metabolicRadar = {
  indicators: [
    { name: 'Glucosa', max: 100 },
    { name: 'Triglicéridos', max: 100 },
    { name: 'HDL', max: 100 },
    { name: 'T. Arterial', max: 100 },
    { name: 'Cintura', max: 100 },
    { name: 'IMC', max: 100 },
  ],
  current: [72, 65, 48, 70, 85, 78],
  reference: [55, 55, 55, 55, 55, 55],
};

export const regionalData = [
  { region: 'Bogotá D.C.', patients: 68, risk: 38 },
  { region: 'Antioquia', patients: 45, risk: 31 },
  { region: 'Valle del Cauca', patients: 38, risk: 35 },
  { region: 'Cundinamarca', patients: 32, risk: 29 },
  { region: 'Atlántico', patients: 28, risk: 33 },
  { region: 'Santander', patients: 22, risk: 27 },
  { region: 'Otros', patients: 14, risk: 25 },
];

export const weekLabels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

export const evolucionSemana = {
  glucosa:       [108, 115, 112, 118, 110, 105, 109],
  trigliceridos: [145, 152, 148, 160, 155, 142, 148],
  hdl:           [48,  46,  49,  45,  47,  50,  49],
};

export const evolucionMes = {
  labels: ['S1','S2','S3','S4','S5','S6','S7','S8'],
  glucosa:       [110, 113, 109, 116, 112, 108, 114, 111],
  trigliceridos: [148, 155, 150, 162, 158, 144, 151, 149],
  hdl:           [47,  45,  48,  44,  46,  49,  48,  50],
};

export const factoresLine = {
  months: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
  series: [
    { name: 'Glucosa',        color: '#7C3AED', data: [72,75,78,74,77,80,79,82,80,83,81,78] },
    { name: 'IMC',            color: '#0EA5E9', data: [58,60,63,61,65,68,67,70,69,72,70,67] },
    { name: 'Triglicéridos',  color: '#84CC16', data: [45,48,46,50,52,55,53,56,54,57,55,52] },
    { name: 'T. Arterial',    color: '#EC4899', data: [38,40,42,39,43,45,44,47,45,48,46,43] },
    { name: 'HDL',            color: '#F59E0B', data: [25,27,26,28,30,32,31,33,32,34,33,30] },
  ],
};

export const diagnostics = [
  { name: 'Obesidad',              value: 45, color: '#7C3AED' },
  { name: 'Hiperglucemia',         value: 35, color: '#0EA5E9' },
  { name: 'Hipertrigliceridemia',  value: 28, color: '#84CC16' },
  { name: 'HDL Bajo',              value: 22, color: '#EC4899' },
  { name: 'Hipertensión',          value: 38, color: '#F59E0B' },
  { name: 'Resistencia Insulínica',value: 30, color: '#EF4444' },
];

export const actividadData = {
  labels: ['S1','S2','S3','S4','S5','S6','S7','S8'],
  calorias: [320, 410, 280, 480, 380, 510, 360, 450],
};

export const estadisticas = [
  { label: 'Glucosa promedio',    value: '112 mg/dL', pct: 74, color: '#7C3AED' },
  { label: 'Triglicéridos prom.', value: '148 mg/dL', pct: 62, color: '#0EA5E9' },
  { label: 'HDL promedio',        value: '48 mg/dL',  pct: 45, color: '#84CC16' },
  { label: 'Presión sistólica',   value: '131 mmHg',  pct: 70, color: '#EC4899' },
  { label: 'Cintura promedio',    value: '95 cm',     pct: 85, color: '#F59E0B' },
];
