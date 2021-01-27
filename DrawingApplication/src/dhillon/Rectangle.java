package dhillon;

import javafx.scene.canvas.GraphicsContext;
import javafx.scene.paint.Color;

/**
 * Rectangle class that extends GeometricObject
 * @author Harmanpreet Dhillon
 */
public class Rectangle extends GeometricObject {
    public Rectangle(double x, double y, double length,
                     double width, double lineWidth, Color color) {
        super(x, y, length, width, lineWidth, color);
    }

    /**
     * public draw method that gets the information needed to draw
     * the rectangle
     * @param gc draws rectangle
     */
    public void draw(GraphicsContext gc) {
        gc.setStroke(getColor());
        gc.setLineWidth(getLineWidth());
        gc.strokeRect(getX(), getY(), getWidth(), getLength());
    }
}
