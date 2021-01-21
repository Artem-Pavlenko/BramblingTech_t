import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import cn from 'classnames'
import s from './Sort.module.scss'
import {reloadingPage, sortBy, sortByUpDown} from "../../../store/usersReducer"
import {useHistory} from "react-router-dom"
import * as queryString from "querystring"
import {DOWN_SORT, SORT_BY_AGE, SORT_BY_ID, SORT_BY_NAME, UP_SORT} from "../../../store/types";

const Sort = () => {

    const {filter} = useSelector(state => state.users)
    const dispatch = useDispatch()
    const history = useHistory()


    const sortByIdHandler = () => {
        dispatch(sortBy(SORT_BY_ID))
    }

    const sortByAgeHandler = () => {
        dispatch(sortBy(SORT_BY_AGE))
    }

    const sortByNameHandler = () => {
        dispatch(sortBy(SORT_BY_NAME))
    }

    const sortUp = () => {
        dispatch(sortByUpDown(UP_SORT))
    }

    const sortDown = () => {
        dispatch(sortByUpDown(DOWN_SORT))
    }
    useEffect(() => {

        const parsed = queryString.parse(history.location.search.substr(1))
        const parsedView = queryString.parse(history.location.pathname.substr(1))
        console.log(parsed)
        console.log(parsedView)
        dispatch(reloadingPage(parsed.upDown, parsed.sort, parsedView.view))
    }, [])

    useEffect(() => {
        history.push({
            pathname: `/view=${filter.view}`,
            search: `?sort=${filter.sort}&upDown=${filter.upDown}&term=${filter.term}`
        })
    }, [filter.sort, filter.upDown, filter.view])

    return (
        <div className={s.sortBlock}>
            <h3>Сортировка</h3>
            <div className={s.btnBlock1}>
                <button
                    onClick={sortByIdHandler}
                    className={cn({[s.active]: filter.sort === SORT_BY_ID})}
                    disabled={filter.sort === SORT_BY_ID}
                >
                    ID
                </button>
                <button
                    onClick={sortByNameHandler}
                    className={cn({[s.active]: filter.sort === SORT_BY_NAME})}
                    disabled={filter.sort === SORT_BY_NAME}
                >
                    Имя
                </button>
                <button
                    onClick={sortByAgeHandler}
                    className={cn({[s.active]: filter.sort === SORT_BY_AGE})}
                    disabled={filter.sort === SORT_BY_AGE}
                >
                    Возраст
                </button>
            </div>
            <div className={s.btnBlock2}>
                <button
                    onClick={sortUp}
                    className={cn({[s.active]: filter.upDown === UP_SORT})}
                    disabled={filter.upDown === UP_SORT}
                >
                    По возрастания
                </button>
                <button
                    onClick={sortDown}
                    className={cn({[s.active]: filter.upDown === DOWN_SORT})}
                    disabled={filter.upDown === DOWN_SORT}
                >
                    По убыванию
                </button>
            </div>
        </div>
    )
}

export default Sort