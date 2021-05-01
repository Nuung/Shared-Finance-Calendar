import React from "react";
import { Link } from "react-router-dom";
import { List } from 'semantic-ui-react'
import TransactionList from "../TransactionList/TransactionList";
import TransactionGraph from "../TransactionGraph/TransactionGraph";

import "./UserProfileTemplate.css";

// service
import * as service from '../../../services/sign';

const UserProfileTemplate = ({ type }) => {
    return (
        <div>
            <TransactionGraph />
            <TransactionList />
        </div>
    );
};

export default UserProfileTemplate;

