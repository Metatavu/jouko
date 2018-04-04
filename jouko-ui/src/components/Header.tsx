let React = require('react');
let NavLink = require('react-router-dom').NavLink;

function Header () {
    return (
        <ul className="header">
            <li>
                <NavLink activeClassName="active" to="/">Home</NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" to="/">Menu2</NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" to="/">Menu3</NavLink>
            </li>
        </ul>
    );
}

module.exports = Header;