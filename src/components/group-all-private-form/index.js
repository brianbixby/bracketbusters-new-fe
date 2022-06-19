import React from 'react';
import { isAlphanumeric, isAscii } from 'validator';

import Tooltip from '../helpers/tooltip';
import { classToggler } from '../../lib/util.js';

class GroupAllPrivateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
      password: '',
      groupNameError: null,
      passwordError: null,
      error: null,
      focused: null,
      submitted: false,
    };
  }
  componentWillUnmount() {
    this.setState({ groupName: '', password: '' });
  }
  validateInput = e => {
    let { name, value } = e.target;

    let errors = {
      passwordError: this.state.passwordError,
      groupNameError: this.state.groupNameError,
    };

    let setError = (name, error) => (errors[`${name}Error`] = error);
    let deleteError = name => (errors[`${name}Error`] = null);

    if (name === 'groupName') {
      if (!value) {
        setError(name, `${name} can not be empty`);
      } else if (!isAlphanumeric(value)) {
        setError(name, 'groupName can only contain letters and numbers');
      } else {
        deleteError(name);
      }
    }

    if (name === 'password') {
      if (!value) {
        setError(name, `${name} can not be empty`);
      } else if (!isAscii(value)) {
        setError(name, 'password may only contain normal characters');
      } else {
        deleteError(name);
      }
    }

    // if (!value) {
    //   setError(name, `${name} can not be empty`);
    // } else {
    //   deleteError(name);
    // }

    this.setState({
      ...errors,
      error: !!(errors.groupNameError || errors.passwordError),
    });
  };
  handleFocus = e => this.setState({ focused: e.target.name });
  handleBlur = e => {
    let { name } = e.target;
    this.setState(state => ({
      focused: state.focused === name ? null : state.focused,
    }));
  };
  handleChange = e => {
    let { name, value } = e.target;
    this.validateInput({ ...e });

    this.setState({
      [name]: value,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.error) {
      //   this.props.onComplete(this.state);

      this.props.onComplete(this.state, this.handleError).catch(err => {
        this.setState({
          error: err,
          submitted: true,
        });
      });
    }
    this.setState(state => ({
      submitted: true,
      groupNameError:
        state.groupNameError || state.groupName ? null : 'required',
      passwordError: state.passwordError || state.password ? null : 'required',
    }));
  };
  handleError = err => {
    const groupNameError =
      err.status === 401
        ? 'groupname or password incorrect'
        : 'Error: please double check your credentials';

    this.setState({
      groupNameError,
    });
  };
  render() {
    let { focused, submitted, passwordError, groupNameError } = this.state;
    return (
      <form
        onSubmit={this.handleSubmit}
        className={classToggler({
          'form page-form all-private-form': true,
          error: this.state.error && this.state.submitted,
        })}
      >
        <input
          className={classToggler({ error: groupNameError })}
          type="text"
          name="groupName"
          placeholder="group name"
          value={this.state.groupName}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <Tooltip
          message={groupNameError}
          show={focused === 'groupName' || submitted}
        />
        <input
          className={classToggler({ passwordError })}
          type="password"
          name="password"
          placeholder="password"
          value={this.state.password}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          autoComplete="new-password"
        />
        <Tooltip
          message={passwordError}
          show={focused === 'password' || submitted}
        />
        <p className="textRight">
          <button className="red-button b-button joinPrivate" type="submit">
            {' '}
            Join Group{' '}
          </button>
        </p>
      </form>
    );
  }
}

export default GroupAllPrivateForm;
