/*
New game request: (http://<server>:<port>/new)
{
     playerid: "TXJnAnwpdDRtTIfJulxtD6Lvx",
     opponent: "randall"
}

New game response: 
{
     activeid:   "TXJnAnwpdDRtTIfJulxtD6Lvx",
     boardstate: "11111111110100100000222222222222"
}


Move request: (http://<server>:<port>/move)
{
     playerid: "TXJnAnwpdDRtTIfJulxtD6Lvx",
     gameid:   "WBllWxEOfrhhORQ88VeBx7Gm8",
     move:     "11x18"
}

Move response:
{
     activeid:   "TXJnAnwpdDRtTIfJulxtD6Lvx",
     lastmove:   "11-15",
     boardstate: "11111111110100100000222222222222"
}


Update/refresh request: (http://<server>:<port>/update)
{
     playerid: "TXJnAnwpdDRtTIfJulxtD6Lvx",
     gameid:   "WBllWxEOfrhhORQ88VeBx7Gm8"
}

Update/refresh response:
1. check that activeid = gameid from request
2. load boardstate
3. animate last move
4. start move

{
     activeid:   "TXJnAnwpdDRtTIfJulxtD6Lvx",
     lastmove:   "11-15", // a jump would be "11x18", multiple jump "11x18x25"
     boardstate: "11111111110100100000222222222222"
}


Login request: (http://<server>:<port>/login)
{
     name: "randall",
     pwd:  "s3cret!"
}

Login response:
{
     name:     "randall",
     email:    "randall@email.com",
     playerid: "TXJnAnwpdDRtTIfJulxtD6Lvx",
     games: ["WBllWxEOfrhhORQ88VeBx7Gm8", "A9djn7h3Pi89saIi6fe0UxsGm"]
}


New player request: (http://<server>:<port>/join)
{
     name:  "randall",
     email: "randall@email.com",
     pwd:   "s3cret!"
}

New player response:
{
     name:     "randall",
     email:    "randall@email.com",
     playerid: "TXJnAnwpdDRtTIfJulxtD6Lvx"
}
*/