import React, {useState} from 'react';
import style from './table.module.scss';
import {FilterType} from "../dashboard/Dashboard";
import {Status} from "../dal/API";
import classNames from "classnames";
import {NavLink} from "react-router-dom";
import direction from '../_images/direction.png'


type TablePropsType = {
    filter: FilterType
    handleChangeFilter: (filter: FilterType) => void
}

export const Table = (props: TablePropsType) => {
    const [isClick, setIsClick] = useState('')

    const nameFilterHandler = () => {
        props.handleChangeFilter({
            field: 'name',
            direction: props.filter.direction === 'asc' ? 'desc' : 'asc'
        })
        setIsClick('name')
    }

    const typeFilterHandler = () => {
        props.handleChangeFilter({
            field: 'type',
            direction: props.filter.direction === 'asc' ? 'desc' : 'asc'
        })
        setIsClick('type')
    }

    const statusFilterHandler = () => {
        props.handleChangeFilter({
            field: 'status',
            direction: props.filter.direction === 'asc' ? 'desc' : 'asc'
        })
        setIsClick('status')
    }

    const siteFilterHandler = () => {
        props.handleChangeFilter({
            field: 'site',
            direction: props.filter.direction === 'asc' ? 'desc' : 'asc'
        })
        setIsClick('site')
    }

    const directionClasses = classNames({
        [style.img]: true,
        [style.imgReverse]: props.filter.direction === 'asc',

    })

    return (

        <div className={style.tableHead}>
            <div className={style.tableElement}
                 onClick={nameFilterHandler}>
                {
                    isClick === 'name' && <img className={directionClasses} src={direction} alt="no image found"/>
                }
                NAME
            </div>
            <div className={style.tableElement}
                 onClick={typeFilterHandler}>
                {
                    isClick === 'type' && <img className={directionClasses} src={direction} alt="no image found"/>
                }
                TYPE
            </div>
            <div className={style.tableElement}
                 onClick={statusFilterHandler}>
                {
                    isClick === 'status' && <img className={directionClasses} src={direction} alt="no image found"/>
                }
                STATUS
            </div>
            <div className={style.tableElement}
                 onClick={siteFilterHandler}>
                {
                    isClick === 'site' && <img className={directionClasses} src={direction} alt="no image found"/>
                }
                SITE
            </div>
        </div>

    );
}

type TableElementPropsType = {
    name: string
    type: string
    status: string
    site: string
    id: number
}

export const TableElement = (props: TableElementPropsType) => {

    let statusClasses = classNames({
        [style.status]: true,
        [style.statusOnline]: props.status === Status.ONLINE,
        [style.statusStopped]: props.status === Status.STOPPED,
        [style.statusPaused]: props.status === Status.PAUSED
    })

    let buttonClasses = classNames({
        [style.button]: props.status !== Status.DRAFT,
        [style.buttonFinalize]: props.status === Status.DRAFT
    })

    let indicatorClasses = classNames({
        [style.indicator]: true,
        [style.indicatorRed]: props.site === 'market.company.com',
        [style.indicatorPurple]: props.site === 'delivery.company.com',
        [style.indicatorBlue]: props.site === 'games.company.com'
    })

    return (
        <div className={style.container}>
            <div className={indicatorClasses}></div>
            <div className={`${style.name}`}>{props.name}</div>
            <div
                className={style.type}>{(props.type === 'MVT') ? 'MVT' : props.type[0] + props.type.replace('_', '-').slice(1).toLocaleLowerCase()}</div>
            <div className={statusClasses}>{props.status[0] + props.status.slice(1).toLocaleLowerCase()}</div>
            <div className={style.site}>{props.site}</div>
            <div className={style.buttonContainer}>
                <NavLink to={(props.status === Status.DRAFT) ? `/finalize/${props.id}` : `/results/${props.id}`}
                         className={buttonClasses}>{(props.status === Status.DRAFT) ? 'Finalize' : 'Results'}</NavLink>
            </div>
        </div>
    )
}

