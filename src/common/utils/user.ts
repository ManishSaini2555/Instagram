export const userInfo = () => {
  const sessonKeys: string[] = Object.keys(sessionStorage)
    .filter((a) => a.includes('aveloair.com'))
    .sort()
  let user: { isLoggedIn: boolean, mail: string, tokken: string, name: string }
  if (sessonKeys.length) {
    user = {
      isLoggedIn: true,
      mail: JSON.parse(sessionStorage[sessonKeys[0]]).idTokenClaims?.email,
      tokken: JSON.parse(sessionStorage[sessonKeys[1]])?.secret,
      name: JSON.parse(sessionStorage[sessonKeys[0]]).idTokenClaims?.given_name
    }
  } else if (
    window.location.origin == 'http://localhost:8080' ||
    window.location.origin == 'http://192.168.1.202:8080'
  ) {
    user = {
      isLoggedIn: true,
      mail: `${process.env.CUSTOMER_MAIL}`,
      name: 'user',
      tokken:
        'eyJhbGciOiJSUzI1NiIsImtpZCI6ImJyWFk1aFVkd0VSbHFWX2t4WDdlZ2VCTXVYZ1ZhVjUyQllNcVJ0VjNGUVUiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiJjMmNhOWIzNy03NmQyLTQ5N2YtYWZjYy1jZmM5Yzg5NmNhZjUiLCJlbWFpbCI6InNhaW5pbWFuaXNoMjU1NUBnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiTWFuaXNoIiwiZmFtaWx5X25hbWUiOiJTYWluaSIsInRpZCI6IjRhZDJmOTNjLTlkODktNDMzYi04MmU3LWEwYTg4NGFhODI0MiIsImNvcnJlbGF0aW9uSWQiOiJlNjU4YjcyOC05ZjM4LTQ4YjctOGRhZC1hYmQ3MmUxNDVmNzciLCJpc0ZvcmdvdFBhc3N3b3JkIjpmYWxzZSwibm9uY2UiOiIyYmE0NWI1YS1kM2YxLTRjNjYtYTdiNi1lNDM4NDEwYTE4NTQiLCJzY3AiOiJBUEkuQWNjZXNzIiwiYXpwIjoiYTQxYjg3ZWItZTkxZC00ZDY0LThiOGUtNWI4YzEwMmVjNzBkIiwidmVyIjoiMS4wIiwiaWF0IjoxNjk0Njg2NjYzLCJhdWQiOiI4YmExNDhhZi1lMzM2LTRmMzItYTMyMS03MjY2ZTc2MWMyMjEiLCJleHAiOjE2OTQ2OTAyNjMsImlzcyI6Imh0dHBzOi8vZGV2LWxvZ2luLmF2ZWxvYWlyLmNvbS80YWQyZjkzYy05ZDg5LTQzM2ItODJlNy1hMGE4ODRhYTgyNDIvdjIuMC8iLCJuYmYiOjE2OTQ2ODY2NjN9.De4w-bMWeJJbYzSjt9mlOfOERnhejCLJ5G4mPEWgJAO6ruodxKZ2qhambDRoyDlZcfBtrXpnkP5WpyMnsccc0kZ0x3mJt_6kPXecjI_nPKz8IjM7ErtQBmJ8YqMK7zrnYlGmZsck6jgC8QZpxbU9lhvYEUbs7O3ws3jFmOP4SRf4oDiE6z-Ke56YQj7mPiCcWeLc_Jg2pKwr3sbrZoL2Luu5di8fV0P5z_GP9Zm_jX7XeIVchq8rmGLNrO7L8jlmGdpSJCAKum9h3nBSS0S-Gf4gavLqv59G4okkQFJMqaJ53IIHPmIuFiTqhxbJAHqIwh9aasEbTGzx94KXArNrlw'
    }
  } else {
    user = {
      isLoggedIn: false,
      mail: '',
      name: '',
      tokken: ''
    }
  }
  window.user = user
  return user
}
