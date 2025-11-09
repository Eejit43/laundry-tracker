/*
 * /geoBoundaries/{boundary}
 */

export interface GeoBoundariesResult {
    id: string;
    organizationName: string;
    merchantName: null;
    userGuid: string;
    userRole: UserRole;
    weightLookupKey: string;
    isAtrium: boolean;
    isMeteredLaundry: boolean;
    isIncludedLaundry: boolean;
    atriumBalanceName: string;
    meteredBalanceName: string;
    geoBoundaries: GeoBoundary[];
    currency: Currency;
    country: Country;
    auxFundsType: null;
    hasCvvVerification: boolean;
    hasAddressVerification: boolean;
    isRetail: boolean;
    isCrm: boolean;
    isTrade: boolean;
    hasMailbox: boolean;
    isoStartDayOfWeek: string;
}

interface Country {
    id: string;
    name: string;
    isoCountryName: string;
    isoCountryCode: string;
}

interface Currency {
    name: string;
    divisor: number;
    decimalPlaces: number;
    iso4217Code: string;
    iso4217Id: string;
    id: string;
    symbol: string;
    thousandsSeparator: string;
    decimalSeparator: string;
    overrideDecimalPlaces: null;
}

interface GeoBoundary {
    fundsRestriction: null;
    hasCard: null;
    washAlertScaleX: null;
    washAlertScaleY: null;
    description: string;
    id: string;
    isDup: boolean;
    geoBoundaryType: BoundaryType;
    breadcrumbIdArray: string[];
    breadcrumbDisplayArray: string[];
    geoBoundaries?: GeoBoundary[];
    ordinalValue: number;
    isRetail: boolean;
    latitude?: string;
    longitude?: string;
    rooms?: Room[];
}

interface BoundaryType {
    id: BoundaryTypeId;
}

enum BoundaryTypeId {
    Location = 'LOCATION',
    OrganizationRouteUniversity = 'ORGANIZATION_ROUTE_UNIVERSITY',
}

interface Room {
    id: string;
    roomName: string;
    breadcrumbDisplay: string;
    breadcrumbId: string;
    isActive: boolean;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: null;
    geomName: GeomName;
    latitude: string;
    longitude: string;
    timeZoneName: TimeZoneName;
    internationalTimeZoneName: TimeZoneName;
    internationalTimeZoneAbbreviation: InternationalTimeZoneAbbreviation;
    hasCoin: boolean;
    hasVtm: boolean;
    hasWashAlert: boolean;
    washAlertImageUrl: null;
    washAlertXAxis: null; // eslint-disable-line @typescript-eslint/naming-convention
    washAlertYAxis: null; // eslint-disable-line @typescript-eslint/naming-convention
    canSms: boolean;
    serviceEmail: ServiceEmail;
    servicePhoneNumber: null;
    roomBanner: null;
    advancedGateway: boolean;
    connectionType: ConnectionType;
    subscriptionExpired: boolean;
    locationPin: string;
    signupBonusAmount: null;
    signupBonusExpirationDate: null;
    maxRedemptions: null;
    ordinalValue: number;
}

enum ConnectionType {
    Connected = 'CONNECTED',
}

enum GeomName {
    RochesterNy = 'Rochester, NY',
}

enum InternationalTimeZoneAbbreviation {
    Edt = 'EDT',
    Uedt = 'UEDT',
}

enum TimeZoneName {
    AmericaIndianapolis = 'America/Indianapolis',
    AmericaNewYork = 'America/New_York',
}

enum ServiceEmail {
    InfoStatewidemachineryCom = 'info@statewidemachinery.com',
}

interface UserRole {
    id: string;
    roleType: BoundaryType;
}

/*
 * /rooms/{room}/machines
 */

export interface RoomsMachinesResult {
    id: string;
    room: Room;
    isDryer: boolean;
    isActive: boolean;
    isWasher: boolean;
    controlId: string;
    createdAt: Date;
    createdBy: number;
    updatedAt: Date;
    updatedBy: null;
    isExternal: boolean;
    machineName: string;
    machineType: MachineType;
    modelNumber: ModelNumber;
    networkNode: string;
    organization: Organization;
    serialNumber: string;
    userRoleType: UserRoleType;
    machineNumber: string;
    machineAuditType: MachineAuditType;
    machineAuditGroupType: MachineAuditType;
    currentStatus: CurrentStatus | null;
    ordinalValue: number;
}

export interface CurrentStatus {
    id: string;
    linkQualityIndicator: number;
    statusId: string;
    canRestart: boolean;
    selectedCycle: Selected;
    selectedModifier: Selected;
    uuid: string;
    createdAt: Date;
    remainingSeconds: number;
    remainingVend: number;
    isDoorOpen: boolean;
    topoffFullyDisabled: boolean;
    canTopOff: boolean;
    topOffVend: number;
    topOffTime: number;
    displayStatus: DisplayStatus;
    microType: number;
    roomId: string;
    gatewayName: GatewayName;
    controlId: string;
    receivedAt: Date;
}

export interface DisplayStatus {
    id: string;
    values: string[];
    times: number[];
}

export enum GatewayName {
    The4077239Bb502B94683086C3693E2713E = '4077239bb502b94683086c3693e2713e',
}

export interface Selected {
    id: number;
    name?: string;
}

export interface MachineAuditType {
    id: MachineAuditGroupTypeId;
    typeName: MachineAuditGroupTypeTypeName;
}

export enum MachineAuditGroupTypeId {
    Titan = 'TITAN',
    TitanT4 = 'TITAN_T4',
}

export enum MachineAuditGroupTypeTypeName {
    QuantumGoldPro = 'Quantum Gold Pro',
    TitanT4 = 'TITAN_T4',
}

export interface MachineType {
    id: string;
    isDryer: boolean;
    isWasher: boolean;
    typeName: MachineTypeTypeName;
}

export enum MachineTypeTypeName {
    Dryer = 'Dryer',
    FrontloadWasher = 'Frontload Washer',
}

export enum ModelNumber {
    Sdenyags176Tw01 = 'SDENYAGS176TW01',
    Sfnnyasp116Tw01 = 'SFNNYASP116TW01',
}

export interface Organization {
    id: string;
    userRoleType: UserRoleType;
    organizationName: OrganizationName;
}

export enum OrganizationName {
    UniversityOfRochester = 'University of Rochester',
}

export interface UserRoleType {
    id: UserRoleTypeId;
}

export enum UserRoleTypeId {
    OrganizationRouteUniversity = 'ORGANIZATION_ROUTE_UNIVERSITY',
}

export interface Room {
    id: string;
    roomName: RoomName;
}

export enum RoomName {
    AndersonHall = 'Anderson Hall',
}
