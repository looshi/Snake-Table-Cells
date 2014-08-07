Snake-Table-Cells
=================

play the game : http://davedave.us/snake/

classic nokia style snake game using table cells

I did this years ago to learn javascript, hopefully it's helpful to others starting out with javascript.


Table Cells ?
------------------
Each "pixel" is represented by a single table cell <td>

The graphics are rendered by flipping the background color of a single table cell "pixel".

I found that the browser ( at the time, may have changed ) crashed quite often at instances of over 1000 divs.  
However, using table cells, I could run this game with great performance using over 9000 table cell instances.

I may abstract out and build a more re-usable engine in table cells.

I think it would be cool to come up with a simple video codec so videos could be rendered in this manner as well.