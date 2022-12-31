# Snake

Classic nokia style snake game.

Play Desktop Version: https://looshi.github.io/snake/snake-desktop

![Alt snake game desktop](https://github.com/looshi/Snake-Table-Cells/blob/master/snake-desktop/snake-desktop.png?raw=true)

Play Mobile Version: https://looshi.github.io/snake/snake-mobile

![Alt snake game](https://github.com/looshi/Snake-Table-Cells/blob/master/snake-mobile/snake-mobile.png?raw=true)


## How To Play
Collect each red fruit square to advance to the next level.  Avoid walls and yourself.  On mobile, touch anywhere on the game board to use a "pass" -- this will cut a hole through the walls and allow you to pass through.  On desktop, any key besides arrows will allow you to use a "pass".

## Table Cells ?
Each "pixel" is represented by a single table cell.  The graphics are rendered by flipping the background color of a single table cell "pixel".

## Psh
 It's an intentional choice to use thousands of dom elements to render the game board, with awareness that it's the "wrong" way to make a game -- that's kind of the whole point.

 I originally wrote the desktop version back around 2010.  I'm still proud of the game play and aesthetics of the board.  A lot of the code is objectively cringe -- however there are some interesting recursive drawing routines I'm not sure I would think of today.  For me personally, this codebase harkens back to simpler and happier times and fills me with nostalgia.

 ## 2023
 2023 update brings in a [new mobile version](https://looshi.github.io/snake/snake-mobile)!   With the addition of touch events and a directional pad, the game is now playable on your mobile device.
