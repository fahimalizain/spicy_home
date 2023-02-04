export interface Course {
    ID: number;
    Name: string;

    /**
     * Don't use this field, it's only for the backend
     */
    Code: string;
    image: any;
}

export interface SubCourse {
    ID: number;
    Name: string;
    Code: string;
    Course: number;
    image: any;
}


export interface ItemGroup {

}