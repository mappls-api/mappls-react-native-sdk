export interface RouteReportSummaryResponse {
    routes: Array<RouteReportModel>
}

export interface RouteReportModel {
    routeIdx: number,
    reports: Array<RouteReportDetailModel>
}

export interface RouteReportDetailModel {
    id: string,
    parentCategory: string,
    childCategory: string,
    address: string,
    latitude: number,
    longitude: number,
    nodeIdx: number,
    status: string,
    reportIcon: string,
    userProfileIcon: string,
    addedByName: string,
    addedBy: string,
    expiry: number,
    usersCount: number,
    description: string,
    iconBaseUrl: string,
    parentCategoryId: number,
    childCategoryId: number
}