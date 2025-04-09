export interface MapplsClusterLinkedResponse {
    devices : Array<Device>;
}

export interface Device {
    deviceFingerprint: string;
    deviceAlias:string;
}