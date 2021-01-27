package dhillon;

import javafx.scene.paint.Color;

/**
 * Abstract GeometricObject class that helps create shapes
 * @author Harmanpreet Dhillon
 */
public abstract class GeometricObject {
    /** The x Coordinate for the shape **/
    private double x;
    /** The y coordinate for the shape **/
    private double y;
    /** The length of the shape **/
    private double length;
    /** The width of the shape **/
    private double width;
    /** The line width if the shape **/
    private double lineWidth;
    /** The color of shape **/
    private Color color;

    /**
     * GeometricObject Constructor that gets the information needed to
     * create the shape
     * @param x the x coordinate
     * @param y the y coordinate
     * @param length the length of the shape
     * @param width the width of the shape
     * @param lineWidth the width of the line
     * @param color the color of the shape
     */
    public GeometricObject(double x, double y, double length,
                           double width, double lineWidth,
                           Color color) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.width = width;
        this.lineWidth = lineWidth;
        this.color = color;
    }

    /**
     * getter for the x coordinate
     * @return the x coordinate
     */
    public double getX() {
        return x;
    }

    /**
     * sets the value of the x coordinate to x
     * @param x x coordinate
     */
    public void setX(double x) {
        this.x = x;
    }

    /**
     * getter for the y coordinate
     * @return the y coordinate
     */
    public double getY() {
        return y;
    }

    /**
     * sets the value of the y coordinate to y
     * @param y y coordinate
     */
    public void setY(double y) {
        this.y = y;
    }

    /**
     * getter for the length
     * @return the length
     */
    public double getLength() {
        return length;
    }

    /**
     * sets the value of the length to length
     * @param length length
     */
    public void setLength(double length) {
        this.length = length;
    }

    /**
     * getter for the width
     * @return width of shape
     */
    public double getWidth() {
        return width;
    }

    /**
     * sets the width to width
     * @param width
     */
    public void setWidth(double width) {
        this.width = width;
    }

    /**
     * getter for the line width
     * @return line width
     */
    public double getLineWidth() {
        return lineWidth;
    }

    /**
     * set the line width to lineWidth
     * @param lineWidth
     */
    public void setLineWidth(double lineWidth) {
        this.lineWidth = lineWidth;
    }

    /**
     * getter for the color
     * @return the color
     */
    public Color getColor() {
        return color;
    }

    /**
     * sets the color to color
     * @param color
     */
    public void setColor(Color color) {
        this.color = color;
    }
}
