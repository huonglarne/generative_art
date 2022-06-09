export class Cell{
    constructor(row, col, width, height, corner_x, corner_y){
        this.corner_x = corner_x
        this.corner_y = corner_y
        this.center_x = corner_x + width/2
        this.center_y = corner_y + height/2
        this.row = row
        this.col = col
        this.width = width
        this.height = height
        this.contents = {}
    }

    move_to(rect_mode){
        push()

        if (rect_mode=='corner'){
            translate(this.corner_x, this.corner_y)
            rectMode(CORNER) 
        }
        else if (rect_mode=='center'){
            translate(this.center_x, this.center_y)
            rectMode(CENTER) 
        }
    }

    move_out(){
        pop()
    }

    show(){
        this.move_to('corner')
        rect(0, 0, this.width, this.height)
        this.move_out()
    }
}

export class Grid{
    constructor(n_rows, n_cols, cell_width, cell_height, corner_x, corner_y){
        this.corner_x = corner_x
        this.corner_y = corner_y
        this.n_rows = n_rows
        this.n_cols = n_cols
        this.cell_width = cell_width
        this.cell_height = cell_height

        this.cells = []

        for (var row=0; row<n_rows; row+=1){
            var col_list = []
            for (var col=0; col<n_cols; col+=1){
                var cell_corner_x = this.corner_x + col*cell_width
                var cell_corner_y = this.corner_y + row*cell_height
                var cell = new Cell(row, col, this.cell_width, this.cell_height, cell_corner_x, cell_corner_y)
                col_list.push(cell)
            }
            this.cells.push(col_list)
        }
    }

    *cells_generator(){
        for (var row=0; row<this.n_rows; row+=1){
            for (var col=0; col<this.n_cols; col+=1){
                var this_cell = this.cells[row][col]
                yield this_cell
            }
        }
    }

    show(){
        for (var this_cell of this.cells_generator()){
            this_cell.show()
          }
    }
}