import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import type { RoomsMachinesResult } from './typings';

const headers = {
    'alliancels-auth-token': process.env.ALLIANCELS_AUTH_TOKEN!,
    'x-api-key': process.env.X_API_KEY!,
    'User-Agent': 'alliance-customer-ios-store',
};

console.log('Fetching data from Alliance Laundry Systems...');

const machines = (await (
    await fetch(`https://api.alliancelslabs.com/rooms/${process.env.ROOM_ID}/machines?raw=true`, { headers })
).json()) as RoomsMachinesResult[];

const machineData = machines
    .map((machine) => ({
        number: machine.machineNumber,
        type: machine.machineType.typeName,
        status: machine.currentStatus?.statusId,
        startTime: machine.currentStatus?.createdAt,
        remainingTime: machine.currentStatus?.remainingSeconds,
        cycle: machine.currentStatus?.selectedCycle.name,
        modifier: machine.currentStatus?.selectedModifier.name,
    }))
    .sort((a, b) => Number.parseInt(b.number) - Number.parseInt(a.number)); // eslint-disable-line unicorn/no-array-sort

const roomSummary: [string, [string, number][]][] = Object.entries(Object.groupBy(machineData, (machine) => machine.type)).map(
    ([type, machines]) => [
        type,
        Object.entries(Object.groupBy(machines, (machine) => machine.status ?? 'UNKNOWN')).map(([status, machines]) => [
            status,
            machines!.length,
        ]),
    ],
);

const dateTimeFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
});

const timestamp = dateTimeFormatter.format(new Date());

const spreadsheetFormattedSummary = roomSummary.flatMap(([machine, statuses]) =>
    statuses.map(([status, count]) => ({ timestamp, machine, status, count })),
);

console.log('Done. Writing data to spreadsheet...');

// Write data to Google Sheets
const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
    key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY!,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const document = new GoogleSpreadsheet(process.env.SPREADSHEET_ID!, serviceAccountAuth);

await document.loadInfo();

const sheet = document.sheetsByIndex[0];

await sheet.addRows(spreadsheetFormattedSummary);

console.log(`Successfully updated spreadsheet with new laundry data as of ${timestamp}.`);

export default {};
