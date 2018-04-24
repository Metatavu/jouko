import * as React from 'react';

export class User extends React.Component {
   render() {
    return(
      <div className="UserSettings">
        <h1>User Settings</h1>
        <form>
          <input type="text" name="username" placeholder="Username" />
          <input type="email" name="email" placeholder="Email" />
          <input type="text" name="firstName" placeholder="First Name" />
          <input type="text" name="lastName" placeholder="Last name" />
          <input type="reset" value="Cancel" /> <input type="submit" value="Save" />
        </form>
    </div>
    );
  }
}
