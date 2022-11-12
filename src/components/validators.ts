function email_check(email: string): boolean {
  /**
   * Runs the email through a regex statement
   * @returns boolean True if valid email
   */

  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function passwd_check(
  passwd: string,
  onButtonPress: boolean
): string | undefined {
  /**
   * Runs the password through some checks
   *
   * @param string The password to check
   * @returns string -	reason for failure null if success
   */
  if (onButtonPress) {
    if (!passwd) return "Please enter a valid password";

    if (passwd.length < 8) return "Password must be atleast 8 characters long";
    if (!/^(?=.*[0-9])$/.test(passwd))
      return "Password requires atleast one number";

    if (!/^(?=.*[!@#$%^&*])$/.test(passwd))
      return "Password requires atleast one special character";
  }

  return;
}

function uname_check(
  uname: string,
  onButtonPress: boolean
): string | undefined {
  if (onButtonPress) {
    if (!uname) return "Please enter a valid username";
    if (uname.length < 6) return "Username must be atleast 6 characters long";
  }
  if (/\s/.test(uname)) return "Username cannot contain spaces";
  if (!/^[A-Za-z0-9\-\_]*$/.test(uname))
    return "Username cannot contain special characters";
  if (uname.length > 20) return "Username cannot be longer than 20 characters";
  return;
}

export { email_check, passwd_check, uname_check };
