export class ToDo {
    constructor(
            public id: string,
            public name: string,
            public completed: string,
            public dateCompleted: string,
            public staffMemberAssigned?: string

    ){}
}