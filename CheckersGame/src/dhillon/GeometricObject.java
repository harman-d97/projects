package dhillon;

/**
 * Abstract GeometricObject class that helps create shapes
 * @author Harmanpreet Dhillon
 */
public abstract class GeometricObject {
    /** the x coordinate for the shape **/
    private double x;
    /** the y coordinate for the shape **/
    private double y;
    /** the line width of the shape **/
    private double lineWidth;

    /**
     * constructor that creates the shape
     * @param x coordinate
     * @param y coordinate
     * @param lineWidth
     */
    public GeometricObject(double x, double y, double lineWidth) {
        this.x = x;
        this.y = y;
        this.lineWidth = lineWidth;

    }

    /**
     * getter for the x coordinate
     * @return x coordinate
     */
    public double getX() {
        return x;
    }

    /**
     * getter for the y coordinate
     * @return y coordinate
     */
    public double getY() {
        return y;
    }

    /**
     * getter for the line width
     * @return line width
     */
    public double getLineWidth() {
        return lineWidth;
    }


}
