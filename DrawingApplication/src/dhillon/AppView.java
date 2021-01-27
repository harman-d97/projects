package dhillon;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.control.*;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.Pane;
import javafx.stage.Stage;
import javafx.scene.paint.Color;
import javafx.event.ActionEvent;

import java.util.ArrayList;

/**
 * The view for the Drawing Application
 * @author Harmanpreet Dhillon
 */
public class AppView extends Application {
    /** x dimensions in pixels **/
    public static final int MAX_X = 700;
    /** y dimension in pixels **/
    public static final int MAX_Y = 700;
    /** title of the Application **/
    static final String TITLE = "Drawing App";

    /** input field for the line width **/
    private TextField lineWidth;
    /** label for the line width **/
    private Label lineWidthLabel;
    /** label for the color **/
    private Label colorLabel;
    /** label for the instructions **/
    private Label instructions;
    /** rectangle button for shape selection **/
    private Button rectangleButton;
    /** circle button for shape selection **/
    private Button circleButton;
    /** reset button to rest canvas **/
    private Button resetButton;
    /** undo button to undo last shape **/
    private Button undoButton;
    /** ColorPicker for selecting colors **/
    private ColorPicker cp;
    /** ArrayList used to store shapes that are drawn **/
    private ArrayList<GeometricObject> objectArrayList;

    /** graphics context for drawing the shapes **/
    private GraphicsContext gc;
    /** canvas for drawing the shapes **/
    private Canvas c;

    /** used to indicate if rectangle button is pressed **/
    private boolean rectangle = false;
    /** used to indicate if circle button is pressed **/
    private boolean circle = false;
    /** x value of mouse click **/
    private double x;
    /** y value of mouse click **/
    private double y;
    /** width of shape **/
    private double width;
    /** length of shape **/
    private double length;

    /**
     * creates the objects for the GUI
     * @param root the window pane
     */
    private void GUIComponents (Pane root) {
        lineWidth = new TextField("");
        lineWidthLabel = new Label("Line Width");
        colorLabel = new Label("Color");
        instructions = new Label("Instructions: \n" +
                "Select a color, select a shape and enter line width \n" +
                "Next right click on the canvas and drag your \n" +
                "mouse to choose how big you want the shape to be");
        rectangleButton = new Button("Rectangle");
        circleButton = new Button("Circle");
        resetButton = new Button("Reset");
        undoButton = new Button("Undo");

        cp = new ColorPicker(Color.RED);

        root.getChildren().addAll(c, rectangleButton, circleButton,
                resetButton, colorLabel, lineWidth, lineWidthLabel,
                cp, instructions, undoButton);
    }

    /**
     * sets the position and width of the GUI components
     */
    private void configureGUIComponents() {
        rectangleButton.relocate(25,650);
        rectangleButton.setPrefWidth(75);

        circleButton.relocate(125,650);
        circleButton.setPrefWidth(75);


        resetButton.relocate(375,650);
        resetButton.setPrefWidth(75);

        undoButton.relocate(275,650);
        undoButton.setPrefWidth(75);

        lineWidthLabel.relocate(25, 600);
        lineWidth.relocate(100, 595);
        lineWidth.setPrefWidth(50);

        colorLabel.relocate(200, 600);
        cp.relocate(250,595);

        instructions.relocate(25, 500);
    }

    /**
     * Handler for when the rectangle button is pressed
     * and handles exceptions for the line width
     * @param e
     */
    private void myRectangleHandler(ActionEvent e) {
        System.out.println("Rectangle button pressed");

        // handles exceptions for line width if number
        // entered is less than 0 or is an invalid character
        try {
            String s = lineWidth.getText();
            Double d = Double.parseDouble(s);
            if (d < 0) {
                throw new NumberFormatException();
            }
        } catch (NumberFormatException ex) {
            System.out.println("line width cannot be less than 0");
            new Alert(Alert.AlertType.WARNING, "Invalid " +
                    "Line Width, Must be a number greater than " +
                    "0").showAndWait();
        }

        // indicates which button is pressed
        rectangle = true;
        circle = false;
    }

    /**
     * Handler for when circle button is pressed
     * and handles exceptions for the line width
     * @param e
     */
    private void myCircleHandler(ActionEvent e) {
        System.out.println("Circle button pressed");

        // handles exceptions for line width if number
        // entered is less than 0 or is an invalid character
        try {
            String s = lineWidth.getText();
            Double d = Double.parseDouble(s);

            if (d < 0) {
                throw new NumberFormatException();
            }
        } catch (NumberFormatException ex) {
            System.out.println("line width cannot be less than 0");
            new Alert(Alert.AlertType.WARNING, "Invalid " +
                    "Line Width, Must be a number greater than " +
                    "0").showAndWait();
        }

        // indicates which button is pressed
        rectangle = false;
        circle = true;
    }

    /**
     * handler for when mouse is pressed
     * @param me
     */
    private void pressHandler(MouseEvent me) {
        System.out.println("press");
        // gets x and y coordinates for the mouse press
        // based on which button is pressed
        if (rectangle) {
            x = me.getX();
            y = me.getY();
            System.out.println(x);
            System.out.println(y);
        } else if (circle) {
            x = me.getX();
            y = me.getY();
            System.out.println(x);
            System.out.println(y);
        }
    }

    /**
     * handler for when mouse is released
     * @param me
     */
    private void releaseHandler(MouseEvent me) {
        System.out.println("release");

        // make new ArrayList used to store GeometricObjects
        objectArrayList = new ArrayList<>();

        if (rectangle) {
            // determines width and length for rectangle
            width = me.getX() - x;
            length = me.getY() - y;

            // handler exception if mouse is dragged the wrong way
            try {
                if (width < 0 || length < 0) {
                    throw new NumberFormatException();
                }
            } catch (NumberFormatException ex) {
                System.out.println("Mouse drag is wrong way");
                new Alert (Alert.AlertType.WARNING, "you " +
                        "must drag your mouse from top left to bottom " +
                        "right, not right to left").showAndWait();
            }
            System.out.println(width);
            System.out.println(length);
            // creates new rectangle and adds it to the ArrayList
            Rectangle r = new Rectangle(x, y, width, length,
                    Double.parseDouble(lineWidth.getText()),
                    cp.getValue());
            r.draw(gc);
            objectArrayList.add(r);
        } else if (circle) {
            // determines width and length for circle
            width = me.getX() - x;
            length = me.getY() - y;

            // handles exception if mouse if dragged the wrong way
            try {
                if (width < 0 || length < 0) {
                    throw new NumberFormatException();
                }
            } catch (NumberFormatException ex) {
                System.out.println("Mouse drag is wrong way");
                new Alert (Alert.AlertType.WARNING, "you " +
                        "must drag your mouse from left to right, " +
                        "not right to left").showAndWait();
            }
            System.out.println(width);
            System.out.println(length);
            // creates circle and adds it to the ArrayList
            Circle c = new Circle(x, y, width, length,
                    Double.parseDouble(lineWidth.getText()),
                    cp.getValue());
            c.draw(gc);
            objectArrayList.add(c);
        }
    }

    /**
     * handler for rest button
     * rests canvas and shape buttons
     * @param e
     */
    private void resetHandler(ActionEvent e) {
        System.out.println("everything reset");
        gc.setFill(Color.SKYBLUE);
        gc.fillRect(0, 0, c.getWidth(), c.getHeight());
        rectangle = false;
        circle = false;
    }

    /**
     * handler for undo button
     * undo's last shape that was drawn
     * @param e
     */
    private void undoHandler(ActionEvent e) {
        System.out.println("Undo");

        // gets x, y, width, and length values of shape from
        // the ArrayList
        int arraySize = objectArrayList.size() - 1;
        double x1 = objectArrayList.get(arraySize).getX();
        double y1 = objectArrayList.get(arraySize).getY();
        double x2 = objectArrayList.get(arraySize).getWidth();
        double y2 = objectArrayList.get(arraySize).getLength();
        double line = Double.parseDouble(lineWidth.getText());

        gc.setStroke(Color.SKYBLUE);
        gc.setLineWidth(line);

        // if the rectangle or circle was the last shape drawn it
        // removes it from the canvas
        if (rectangle) {
            gc.strokeRect(x1, y1, x2, y2);
        } else if (circle) {
            gc.setLineWidth(line + 1);
            gc.strokeOval(x1, y1, x2, x2);
        }

        // removes the shape in the last index position
        objectArrayList.remove(objectArrayList.size() -1);
    }

    /**
     *
     * @param stage The main stage
     * @throws Exception
     */
    @Override
    public void start(Stage stage) throws Exception {
        Pane root = new Pane();
        Scene scene = new Scene(root, MAX_X, MAX_Y);
        c = new Canvas(700,450);
        stage.setTitle(TITLE);
        stage.setScene(scene);

        gc = c.getGraphicsContext2D();

        // sets color for canvas and draws it
        gc.setFill(Color.SKYBLUE);
        gc.fillRect(0, 0, c.getWidth(), c.getHeight());

        GUIComponents(root);
        configureGUIComponents();

        // handlers for buttons and mouse clicks
        rectangleButton.setOnAction(this::myRectangleHandler);
        circleButton.setOnAction(this::myCircleHandler);
        resetButton.setOnAction(this::resetHandler);
        undoButton.setOnAction(this::undoHandler);
        c.addEventHandler(MouseEvent.MOUSE_PRESSED, this::pressHandler);
        c.addEventHandler(MouseEvent.MOUSE_RELEASED, this::releaseHandler);

        stage.show();
    }

    /**
     *
     * @param args unused
     */
    public static void main(String[] args) {
        launch(args);
    }
}

