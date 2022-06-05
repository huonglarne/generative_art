import {Grid} from './grid.js'

export class Circle{
    constructor(origin_x, origin_y, radius){
        this.origin_x = origin_x
        this.origin_y = origin_y
        this.radius = radius
        this.contents = {}
    }

    draw(){
        circle(this.origin_x, this.origin_y, this.radius*2)
        // rect(this.origin_x, this.origin_y, this.radius*2, this.radius*2)
    }

    static distance(circle_a, circle_b){
        var d = dist(circle_a.origin_x, circle_a.origin_y, circle_b.origin_x, circle_b.origin_y)
        return d - circle_a.radius - circle_b.radius
    }
}

export class CirclePack{
    constructor(max_r, min_r, min_dist, corner_x, corner_y, width, height, max_finding_time=100){
        this.max_r = max_r
        this.min_r = min_r
        this.min_dist = min_dist

        this.corner_x = corner_x
        this.corner_y = corner_y
        this.height = height
        this.width = width

        var grid_cell_size = this.max_r*2
        var n_rows = floor(this.height/grid_cell_size)
        var n_cols = floor(this.width/grid_cell_size)
        this.grid = new Grid(n_rows, n_cols, grid_cell_size, grid_cell_size, this.corner_x, this.corner_y)

        var grid = this.grid
        for (var row=0; row<grid.n_rows; row+=1){
            for (var col=0; col<grid.n_cols; col+=1){
                var this_cell = grid.cells[row][col]
                this_cell.contents['circle_list'] = []
            }
        }
    }

    draw(){
        for (var row=0; row<this.grid.n_rows; row+=1){
          for (var col=0; col<this.grid.n_cols; col+=1){
            var this_cell = this.grid.cells[row][col]
            var this_circle_list = this_cell.contents['circle_list']
            var new_circle = this.gen_new_circle_in_cell(this_cell)
            
            if (new_circle){
                this_circle_list.push(new_circle)
                new_circle.draw()
            }
          }
        }
    }

    gen_new_circle_in_cell(this_cell){
        var cells_to_check = [this_cell].concat(this.get_adj_cells(this_cell.row, this_cell.col))

        var count = 0
        do {
            var origin_x = this_cell.center_x + random(-this_cell.width/2, this_cell.width/2)
            var origin_y = this_cell.center_y + random(-this_cell.height/2, this_cell.height/2)
            var valid_radius = this.find_valid_radius(origin_x, origin_y, cells_to_check)
            count+=1
        }
        while (count<this.max_finding_time && valid_radius===null)

        if (!valid_radius){
            return null
        } 
        
        if (valid_radius>this.max_r){
            valid_radius = random(this.min_r, this.max_r)
        }
        
        var circle = new Circle(origin_x, origin_y, valid_radius)
        return circle
    }
        
    find_valid_radius(origin_x, origin_y, cells_to_check){
        var list_radius = []
        
        for (var i=0; i<cells_to_check.length; i+=1){
            var cell = cells_to_check[i]
            var d = this.valid_radius_in_cell(origin_x, origin_y, cell)
            if (d){
                list_radius.push(d)
            }
            else {
                return null
            }
        }
        return min(list_radius)
    }
        
        
    valid_radius_in_cell(origin_x, origin_y, cell){
        var list_radius = []
        var list_adj_circles = cell.contents['circle_list']
        for (var k=0; k<list_adj_circles.length; k+=1){
            var adj_circle = list_adj_circles[k]
            var d = this.valid_radius_to_circle(origin_x, origin_y, adj_circle)
        
            if (!d){
            return null
            }
            else(
            list_radius.push(d)
            )
        }
        
        return min(list_radius)
    }
        
    valid_radius_to_circle(origin_x, origin_y, circle){
        var d = dist(origin_x, origin_y, circle.origin_x, circle.origin_y) - circle.radius - this.min_dist - this.min_r
        if (d<=0){
            return null
        }
        else{
            return d + this.min_r
        }
    }
        
    get_adj_cells(cur_row, cur_col){
        var list_cells = []
        var list_adj = [[cur_row-1, cur_col-1], [cur_row-1, cur_col], [cur_row-1, cur_col+1], [cur_row, cur_col-1], [cur_row, cur_col+1], [cur_row+1, cur_col-1], [cur_row+1, cur_col], [cur_row+1, cur_col+1]]
        for (var i=0; i<list_adj.length; i+=1){
            var row = list_adj[i][0]
            var col = list_adj[i][1]
            if ((-1<row) && (row<this.grid.n_rows) && (-1<col) && (col<this.grid.n_cols)){
            var adj_cell = this.grid.cells[row][col]
            list_cells.push(adj_cell)
            }
        }
        return list_cells
    }
}