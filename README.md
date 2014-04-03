minesweeper-js-kata
===================

Implementations and files related to the first BBC North Dojo event: Minesweeper


Background
==========

The objective of the game is to clear a minefield without exploding any of the mines.


Rules
=====

The minefield
-------------
- There is a minefield consisting of a grid of squares.
- The minefield contains a known number of mines. The locations of the mines are not known to the player.

Uncovering a square
-------------------
- A square can be uncovered.
- If a square containing a mine is uncovered then the mine is exploded and the game is lost.
- If an empty square is uncovered then the number of mines in the neighbouring squares is revealed. "Neighbouring" squares are the eight immediately adjacent ones.
- If all empty squares are uncovered then the game is won.

Flagging a square
-----------------
- When the game starts, the player has a number of flags available equal to the number of mines.
- A flag can be placed on a square.
- A flag can be removed from a square.
- When all the flags have been placed, if every flag is on a square containing a mine then the game is won.

Extra credit
------------
- When uncovering a square, if there are no neighouring mines, then each neighbour is also automatically revealed.
- Any automatically revealed squares that also have no neighbouring mines will in turn cause its neighbours to be revealed. And so on...
