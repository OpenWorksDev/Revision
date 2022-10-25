function email_check(email: string): boolean {
  /**
   * Runs the email through a regex statement
   * @returns boolean True if valid email
   */

  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function passwd_check(passwd: string): string | undefined {
  /**
   * Runs the password through some checks
   *
   * @param string The password to check
   * @returns string -	reason for failure null if success
   */
  if (passwd.length < 8) return "Password is shorter than 8 characters";

  if (/^(?=.*[0-9])$/.test(passwd))
    return "Password does not contain any numbers";

  if (/^(?=.*[!@#$%^&*])$/.test(passwd))
    return "Password does not contain any special characters";

  return;
}

function uname_check(uname: string): boolean {
  return /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(uname)
}

export { email_check, passwd_check, uname_check };
