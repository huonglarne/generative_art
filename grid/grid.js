export class Cell{
    constructor(row, col, cell_width, cell_height, corner_x, corner_y){
        this.corner_x = corner_x
        this.corner_y = corner_y
        this.row = row
        this.col = col
        this.width = cell_width
        this.height = cell_height
        this.contents = {}
    }

    move_to(rect_mode){
        push()

        if (rect_mode=='corner'){
            translate(this.corner_x, this.corner_y)
            rectMode(CORNER) 
        }
        else if (rect_mode=='center'){
            translate(this.corner_x + this.width/2, this.corner_y + this.height/2)
            rectMode(CENTER) 
        }
    }

    move_out(){
        pop()
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
}