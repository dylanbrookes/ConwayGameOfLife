function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i=0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}


let grid;
let cols;
let rows;
let resolution = 40;


function draw() {
    let gridCanvas = document.getElementById("gridCanvas");
    var ctx = gridCanvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.strokeStyle = "black";
    

    for (let x = 0; x < cols; x ++) {
        for (let y=0; y < rows; y++) {
            let x_draw = x * resolution;
            let y_draw = y * resolution;
            if (grid[x][y].value == 1) {
                ctx.fillRect(x_draw,y_draw,resolution-1, resolution-1);
            }
            ctx.strokeRect(x_draw,y_draw,resolution, resolution)
        }
    }

}


class Cell {
    constructor(x, y) {
        this.value = Math.floor(Math.random() * Math.floor(2));
        this.x = x;
        this.y = y;
    }

    adjacentCellsSum() {
        let sum = 0
        let x = this.x;
        let y = this.y;

        try { sum += grid[x-1][y-1].value; } catch (e) {sum += 0} // bottom left diagonal
        try { sum += grid[x-1][y+1].value; } catch (e) {sum += 0} // bottom left diagonal
        try { sum += grid[x+1][y+1].value; } catch (e) {sum += 0} // bottom left diagonal
        try { sum += grid[x+1][y-1].value; } catch (e) {sum += 0} // bottom left diagonal

        try { sum += grid[x-1][y].value; } catch (e) {sum += 0} // left
        try { sum += grid[x+1][y].value; } catch (e) {sum += 0} // right

        try { sum += grid[x][y+1].value; } catch (e) {sum += 0} // up
        try { sum += grid[x][y-1].value; } catch (e) {sum += 0} // down

        return sum;
    }

}


function setup() {
    cols = 1000 / resolution;
    rows = 1000 / resolution;
    grid = make2DArray(cols, rows);

    for (let x=0; x < cols; x++) {
        for (let y=0; y < rows; y++) {
            grid[x][y] = new Cell(x, y);
        }
    }
}

setup();
draw();
console.log(grid[0][0].adjacentCellsSum());
