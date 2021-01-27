package dhillon;

import javafx.scene.canvas.GraphicsContext;
import javafx.scene.paint.Color;

/**
 * Circle class that extends GeometricObject
 * @author Harmanpreet Dhillon
 */
public class Circle extends GeometricObject {
    public Circle(double x, double y, double length,
                  double width, double lineWidth, Color color) {
        super(x, y, length, width, lineWidth, color);
    }

    /**
     * public draw method that gets the information needed to draw
     * the circle
     * @param gc draws circle
     */
    public void draw (GraphicsContext gc) {
        gc.setStroke(getColor());
        gc.setLineWidth(getLineWidth());
        gc.strokeOval(getX(), getY(), getWidth(), getWidth());
    }
}
