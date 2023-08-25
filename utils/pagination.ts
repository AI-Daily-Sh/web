import { get } from "http";

let defaultLimit = 4;
let defaultPage = 1;

export function getStartLimit(page: number, limit: number){
    return (getPage(page) * getLimit(limit)) - getLimit(limit);
}

export function getEndLimit(page: number, limit: number){
    return (getPage(page) * getLimit(limit)) - 1;
}

export function getLimit(limit: number){
    if(limit && limit > 0) {
        return limit;
    }

    return defaultLimit;
}

export function getPage(page: number){
    if(page && page > 0) {
        return page;
    }

    return defaultPage;
}


export default function pagination(data: any, page: number, limit: number, totalCount: number){
    const isPrev = getPage(page) > 1;
    const isNext = getPage(page) * getLimit(limit) < totalCount;    
    
    return {
        data,
        meta: {
            isPrev,
            isNext,
            prevPage: isPrev ? getPage(page) - 1 : null,
            currentPage: getPage(page),
            nextPage: isNext ? getPage(page) + 1 : null,
            limit: getLimit(limit),
            totalCount,
        },
    };
}