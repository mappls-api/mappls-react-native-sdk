export interface ReportMasterModel{
    baseURLObj: BaseUrlObjectModel,
    parentCategories: Array<ParentCategoryModel>
}

export interface BaseUrlObjectModel {
    icon_url: string;
}

export interface ParentCategoryModel {
    id: number,
    name: string,
    icon: string,
    childCategories: Array<ChildCategoryModel>
}

export interface ChildCategoryModel {
    id: number,
    name: string,
    icon: string,
    desc: object,
    expiry_in_hours: number,
    subChildCategories: Array<ChildCategoryModel>
}