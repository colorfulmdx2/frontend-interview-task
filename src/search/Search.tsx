import React, {ChangeEvent, useState} from 'react';
import style from './search.module.scss';
import search from '../_images/search.png'
import {TestDtoType} from "../dashboard/Dashboard";

type SearchPropsType = {
    data: TestDtoType[]
    searchHandler: (arg: string) => void
}

export const Search = (props: SearchPropsType) => {

    const [value, setValue] = useState<string>('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {                  //instant search
        setValue(e.currentTarget.value)
        props.searchHandler(e.currentTarget.value.toLocaleLowerCase())
    }

    const onKeyPressHandler = (e: any) => {                                          //keypress search
        if (e.charCode === 13) {
            //props.searchHandler(e.currentTarget.value.toLocaleLowerCase())
        }
    }


    return (
        <div className={style.container}>
            <img className={style.icon}
                 src={search}
                 alt="no image found"/>
            <input className={style.input}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   type="text"
                   placeholder={'What test are you looking for?'}
                   value={value}
            />
            <div className={style.testsCount}>{props.data.length ? `${props.data.length} tests` : ''}</div>
        </div>


    );
}

