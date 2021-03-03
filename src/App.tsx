import React, {useEffect, useState} from 'react';
import {Redirect, Route} from 'react-router-dom';
import './App.scss';
import {Dashboard, TestDtoType} from "./dashboard/Dashboard";
import {serviceApi, Status} from "./dal/API";


function App() {
    const [testsDto, setTestsDto] = useState<TestDtoType[]>([]);
    const [newData, setNewData] = useState<TestDtoType[]>([]);

    const getData = async () => {
        const tests = await serviceApi.getTests();
        const sites = await serviceApi.getSites()
        const testsDto = tests.map(test => ({
            ...test,
            name: test.name.toLocaleLowerCase(),
            site: sites.find(site => test.siteId === site.id)?.url as string
        }))
        setNewData(testsDto)
        setTestsDto(testsDto)
    };


    useEffect(() => {
        getData()
    }, [])

    const filterState = (query: string) => {
        if (!query) {
            getData()
        } else {
            setTestsDto(newData.filter((e) => e.name.startsWith(query)))
        }
    }

    return (
        <>
            <Route exact path={'/'} render={() => <Dashboard title={'Dashboard'}
                                                             testsDto={testsDto}
                                                             searchHandler={filterState}/>}/>
            <Route exact path='/results' render={() => <Dashboard title={'Results'}
                                                                testsDto={testsDto.filter(test => test.status !== Status.DRAFT)}
                                                                searchHandler={filterState}/>}/>
            <Route exact path='/finalize' render={() => <Dashboard title={'Finalize'}
                                                                 testsDto={testsDto.filter(test => test.status === Status.DRAFT)}
                                                                 searchHandler={filterState}
            />}/>
            <Route path='/results/:id' render={() => <Dashboard title={'Results'}
                                                            testsDto={testsDto.filter(test => test.status !== Status.DRAFT)}
                                                            searchHandler={filterState}/>}/>
            <Route path='/finalize/:id' render={() => <Dashboard title={'Finalize'}
                                                             testsDto={testsDto.filter(test => test.status === Status.DRAFT)}
                                                             searchHandler={filterState}
            />}/>
        </>
    );
}

export default App;
