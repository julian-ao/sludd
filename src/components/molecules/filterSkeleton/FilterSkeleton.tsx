import { useState, useEffect, useRef, useCallback } from 'react';
import './filterSkeleton.css';

export type FilterSkeletonProps = {
    title: string;
    values: string[];
    currentFilters: string[];
    setFilters: (list: string[]) => void;
};

const FilterSkeleton = (props: FilterSkeletonProps) => {
    const [visible, setVisible] = useState<boolean>(false);
    const filterRef = useRef<HTMLDivElement | null>(null);

    // Handle checkbox change and add/remove value from currentFilters
    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        event.stopPropagation();

        const value = event.currentTarget.value;
        if (props.currentFilters.includes(value)) {
            props.setFilters(
                props.currentFilters.filter((item) => item !== value),
            ); // remove value
        } else {
            props.setFilters([...props.currentFilters, value]); // add value
        }
    };

    // Handle click outside of filter box and set visible false
    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (
            filterRef.current &&
            !filterRef.current.contains(event.target as Node)
        ) {
            setVisible(false);
        }
    }, []);

    // Add event listener for click outside of filter box
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <div className="filter_container" ref={filterRef}>
            <div
                className="filter_box"
                role="filter_box"
                aria-label="click me!"
                onClick={() => setVisible(!visible)}
            >
                <div
                    className="filter_title"
                    style={{
                        borderBottom: visible ? '1px solid #c7c7c7' : 'none',
                        paddingBottom: visible ? '10px' : 0,
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="filter_icon"
                        viewBox="0 0 20 18"
                        fill="none"
                    >
                        <path
                            d="M0.152157 0.894636C0.41 0.347697 0.956939 0 1.56248 0H18.4395C19.045 0 19.5919 0.347697 19.8498 0.894636C20.1076 1.44158 20.0295 2.08618 19.6466 2.55499L12.5013 11.2865V16.2519C12.5013 16.7246 12.2356 17.1583 11.8098 17.3692C11.3839 17.5802 10.88 17.5372 10.501 17.252L8.00073 15.3768C7.68429 15.1424 7.50067 14.7713 7.50067 14.3767V11.2865L0.3514 2.55108C-0.0275511 2.08618 -0.109592 1.43767 0.152157 0.894636Z"
                            fill="#6D6D6D"
                        />
                    </svg>
                    {props.title}
                    {props.currentFilters.length > 0 && (
                        <div style={{ marginLeft: '5px' }}>
                            ({props.currentFilters.length} valgt)
                        </div>
                    )}
                </div>
                <div
                    className="filter_values_container"
                    role="filter_values_container"
                    style={{
                        visibility: visible ? 'visible' : 'hidden',
                        height: visible ? 'auto' : 0,
                        paddingTop: visible ? '10px' : 0,
                    }}
                >
                    {props.values.map((value, index) => {
                        const isChecked = props.currentFilters.includes(value);
                        return (
                            <label
                                key={index}
                                className="filter_value"
                                onClick={(event) => {
                                    event.stopPropagation();
                                }}
                            >
                                <input
                                    value={value}
                                    type={'checkbox'}
                                    className="filter_button"
                                    onChange={handleCheckboxChange}
                                    checked={isChecked}
                                />
                                {value}
                            </label>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FilterSkeleton;
