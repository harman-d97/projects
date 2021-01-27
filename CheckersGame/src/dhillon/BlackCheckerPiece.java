package dhillon;

import javafx.scene.canvas.GraphicsContext;
import javafx.scene.paint.Color;

/**
 * BlackCheckerPiece class that extends Geometricobject
 * @author Harmanpreet Dhillon
 */
public class BlackCheckerPiece extends GeometricObject {

    public BlackCheckerPiece(double x, double y, double lineWidth) {
        super(x, y, lineWidth);
    }

    /**
     * public draw method that draws the checker piece
     * @param gc
     */
    public void draw(GraphicsContext gc) {
        gc.setFill(Color.BLACK);
        gc.setLineWidth(getLineWidth());
        gc.fillOval(getX(), getY(), 50, 50);
    }
}
