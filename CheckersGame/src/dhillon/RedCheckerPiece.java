package dhillon;

import javafx.scene.canvas.GraphicsContext;
import javafx.scene.paint.Color;

/**
 * RedCheckerPiece class that extends GeometricObject
 * @author Harmanpreet Dhillon
 */
public class RedCheckerPiece extends GeometricObject {

    public RedCheckerPiece(double x, double y, double lineWidth) {
        super(x, y, lineWidth);
    }

    /**
     * public draw method that draws the checker piece
     * @param gc
     */
    public void draw(GraphicsContext gc) {
        gc.setFill(Color.RED);
        gc.setLineWidth(getLineWidth());
        gc.fillOval(getX(), getY(), 50, 50);
    }
}
