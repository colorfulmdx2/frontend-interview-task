import React, {useState} from 'react';
import style from './Dashboard.module.scss';
import {Search} from "../search/Search";
import {Table, TableElement} from "../table/Table";
import {Status, Test} from "../dal/API";
import {NavLink, useHistory, useParams} from 'react-router-dom';


type DashboardPropsType = {
    title: string
    testsDto: TestDtoType[]
    searchHandler: (arg: string) => void
}

export type FilterType = {
    field: keyof TestDtoType
    direction: 'asc' | 'desc'
}

export type TestDtoType = Test & { site: string }


const sortedTestsHandle = (filter: FilterType, tests: TestDtoType[]): TestDtoType[] => {
    const status = Object.keys(Status).reduce((acc, key, index) => {
        acc[key] = index
        return acc
    }, {} as { [key: string]: number })


    if (filter.direction === 'asc') {
        if (filter.field === "status") {
            return tests.sort((a, b) => status[a.status] > status[b.status] ? 1 : -1)
        } else {
            return tests.sort((a, b) => a[filter.field] > b[filter.field] ? 1 : -1)
        }
    } else {
        if (filter.field === "status") {
            return tests.sort((a, b) => status[a.status] > status[b.status] ? -1 : 1)
        } else {
            return tests.sort((a, b) => a[filter.field] > b[filter.field] ? -1 : 1)
        }
    }
}

export const Dashboard = (props: DashboardPropsType) => {

    const [sorted, setSorted] = useState<FilterType>({field: 'name', direction: 'asc'});

    let sortedTests = sortedTestsHandle(sorted, props.testsDto)


    const handleChangeFilter = (filter: FilterType) => {
        setSorted(filter)
    }

    const params = useParams<any>()

    if (params.id) {
        sortedTests = sortedTests.filter(e => e.id === Number(params.id))
    }


    let elements = sortedTests.map(test => {
        let config = 'http://'
        let config2 = 'https://www.'
        let config3 = 'https://'

        let url = test.site

        if (url && url.includes(config)) {
            url = url.replace(config, '')
        }

        if (url && url.includes(config2)) {
            url = url.replace(config2, '')
        }

        if (url && url.includes(config3)) {
            url = url.replace(config3, '')
        }
        return (
            <TableElement name={test.name[0].toLocaleUpperCase() + test.name.slice(1)}
                          type={test.type}
                          status={test.status}
                          site={url ? url : 'no site detected'}
                          key={test.id}
                          id={test.id}
            />
        )
    })

    let history = useHistory();

    function onclickHandler() {
        history.push("/");
    }

    return (
        <div className={style.container}>
            <h1 className={style.title}>{props.title}</h1>
            <Search data={props.testsDto}
                    searchHandler={props.searchHandler}
            />
            {
                props.testsDto.length
                    ? <>
                        <Table filter={sorted}
                               handleChangeFilter={handleChangeFilter}/>
                        {
                            elements
                        }
                    </>

                    : <div className={style.noDataContainer}>
                        <div className={style.message}>There is no data found</div>
                        <button onClick={onclickHandler} className={style.button}>Reset</button>
                    </div>

            }
            <NavLink className={style.prev} to={'/'}>{!(props.title === 'Dashboard') && '<    Back'}</NavLink>
        </div>
    );
}



