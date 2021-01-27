package dhillon;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.control.*;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.stage.Stage;

import javafx.event.ActionEvent;
import java.util.ArrayList;

/**
 * Creates the checker game
 *
 * @author Harmanpreet Dhillon
 */
public class GameView extends Application {
    /** x dimension in pixels **/
    public static final int MAX_X = 700;
    /** y dimension in pixels **/
    public static final int MAX_Y = 700;
    /** title of the app **/
    static final String TITLE = "Checkers Game";

    /** add button for new pieces **/
    private Button add;
    /** remove button **/
    private Button remove;
    /** button to select black checker piece **/
    private Button blackPiece;
    /** button to select red checker piece **/
    private Button redPiece;
    /** input for the row number **/
    private TextField row;
    /** input for the column number **/
    private TextField column;
    /** label for the row number **/
    private Label rowLabel;
    /** label for the column number **/
    private Label columnLabel;
    /** label for the user instructions **/
    private Label instructions;

    /** arraylist that hold objects of type Geometric Object **/
    private ArrayList<GeometricObject> checkersArrayList;
    /** graphics context for drawing **/
    private GraphicsContext gc;
    /** canvas used to draw on **/
    private Canvas c;

    /** current x value of the click position **/
    private double currentX;
    /** current y value of the click position **/
    private double currentY;
    /** used to indicate if black checker button is pressed **/
    private boolean blackChecker = false;
    /** used to indicate if red checker button is pressed **/
    private boolean redChecker = false;

    /**
     * creates the objects for the GUI
     * @param root
     */
    private void GUIComponents (Pane root) {
        add = new Button("Add");
        remove = new Button("Remove");
        blackPiece = new Button("Black Checker Piece");
        redPiece = new Button("Red Checker Piece");
        row = new TextField("");
        column = new TextField("");
        rowLabel = new Label("row:");
        columnLabel = new Label("column:");
        instructions = new Label("Instructions: \n " +
                "To add a new piece click on " +
                "either black or red checker piece button, " +
                "enter the row and column, then press add. \n" +
                "To remove a checker piece click on the checker " +
                "piece and press the remove button");

        root.getChildren().addAll(c, add, remove, blackPiece,
                redPiece, row, column, rowLabel, columnLabel,
                instructions);
    }

    /**
     * sets the position and width of the GUI components
     */
    private void configureGUIComponents() {
        instructions.relocate(50, 552);

        blackPiece.relocate(50, 610);
        blackPiece.setPrefWidth(150);

        redPiece.relocate(225, 610);
        redPiece.setPrefWidth(150);

        rowLabel.relocate(50, 645);

        row.relocate(85, 640);
        row.setPrefWidth(30);

        columnLabel.relocate(150, 645);

        column.relocate(200, 640);
        column.setPrefWidth(30);

        add.relocate(50, 670);
        add.setPrefWidth(50);

        remove.relocate(500, 640);
        remove.setPrefWidth(70);

    }

    /**
     * Handler for when the Black checker button is pressed
     * @param e
     */
    private void myBlackCheckerHandler(ActionEvent e) {
        System.out.println("Black Checker Piece button pressed");

        blackChecker = true;
        redChecker = false;
    }

    /**
     * handler for when the red checker button is pressed
     * @param e
     */
    private void myRedCheckerHandler(ActionEvent e) {
        System.out.println("Red Checker Piece button pressed");

        redChecker = true;
        blackChecker = false;
    }

    /**
     * handler for when the remove button is pressed
     * @param e
     */
    private void myRemoveHandler(ActionEvent e) {
        System.out.println("remove button pressed");
        // checks if selected checker is in the arraylist and removes it
        for(GeometricObject b : checkersArrayList) {
            if ( (b.getX() <= currentX && b.getX() + 50 >= currentX) && (b.getY() <= currentY && b.getY() + 50 >= currentY ) ) {
                gc.setFill(Color.GRAY);
                gc.fillRect(b.getX() - 5, b.getY() - 5, 57, 57);
                checkersArrayList.remove(b);
            }
        }
    }

    /**
     * handler for when the add button is pressed
     * handles exceptions and adds the new checker piece
     * @param e
     */
    private void myAddHandler(ActionEvent e) {
        System.out.println("add button pressed");
        String s1 = row.getText();
        int rowNum = Integer.parseInt(s1);

        String s2 = column.getText();
        int columnNum = Integer.parseInt(s2);

        try {
            if (rowNum <= 0) {
                throw new NumberFormatException();
            }
        } catch (NumberFormatException ex) {
            System.out.println("row number must be greater than 0");
            new Alert(Alert.AlertType.WARNING, "Invalid " +
                    "row number, must be a number greater than " +
                    "0").showAndWait();
        }

        try {
            if (columnNum <= 0) {
                throw new NumberFormatException();
            }
        } catch (NumberFormatException ex) {
            System.out.println("column number must be greater than 0");
            new Alert(Alert.AlertType.WARNING, "Invalid " +
                    "column number, must be a number greater than " +
                    "0").showAndWait();
        }


        double x = 0;
        double y = 0;

        if (rowNum == 1) {
            y = 8.75;
        } else if (rowNum == 2) {
            y = 77.5;
        } else if (rowNum == 3) {
            y = 146.25;
        } else if (rowNum == 4) {
            y = 215;
        } else if (rowNum == 5) {
            y = 283.75;
        } else if (rowNum == 6) {
            y = 352.5;
        } else if (rowNum == 7) {
            y = 421.25;
        } else if (rowNum == 8) {
            y = 490;
        }

        if (columnNum == 1) {
            x = 15;
        } else if (columnNum == 2) {
            x = 102.5;
        } else if (columnNum == 3) {
            x = 190;
        } else if (columnNum == 4) {
            x = 277.5;
        } else if (columnNum == 5) {
            x = 365;
        } else if (columnNum == 6) {
            x = 452.5;
        } else if (columnNum == 7) {
            x = 540;
        } else if (columnNum == 8) {
            x = 627.5;
        }

        if (blackChecker) {
            BlackCheckerPiece bp = new BlackCheckerPiece(x, y, 1);
            try {
                for (GeometricObject g : checkersArrayList) {
                    if (g.getX() == x && g.getY() == y) {
                        throw new NumberFormatException();
                    }
                }
            } catch (NumberFormatException ex) {
                System.out.println("There is already a checker piece there");
                new Alert(Alert.AlertType.WARNING, "There " +
                        "is already a checker piece in that " +
                        "position").showAndWait();
            }
            bp.draw(gc);
            checkersArrayList.add(bp);
        } else if (redChecker) {
            RedCheckerPiece rp = new RedCheckerPiece(x, y, 1);
            try {
                for (GeometricObject g : checkersArrayList) {
                    if (g.getX() == x && g.getY() == y) {
                        throw new NumberFormatException();
                    }
                }
            } catch (NumberFormatException ex) {
                System.out.println("There is already a checker piece there");
                new Alert(Alert.AlertType.WARNING, "There " +
                        "is already a checker piece in that " +
                        "position").showAndWait();
            }
            rp.draw(gc);
            checkersArrayList.add(rp);
        }


    }

    /**
     * handler for mouse clicks
     * indicates if a checker is selected and outlines it
     * @param me
     */
    private void pressHandler(MouseEvent me) {
        System.out.println("mouse pressed");

        currentX = me.getX();
        currentY = me.getY();
        gc.setStroke(Color.GREEN);


        for(GeometricObject b : checkersArrayList) {
            if ( (b.getX() <= currentX && b.getX() + 50 >= currentX) && (b.getY() <= currentY && b.getY() + 50 >= currentY ) ) {
                gc.setLineWidth(5);
                gc.strokeOval(b.getX(), b.getY(), 50, 50);
            }

        }
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
        c = new Canvas(700, 550);
        stage.setTitle(TITLE);
        stage.setScene(scene);

        gc = c.getGraphicsContext2D();

        // draws board
        gc.setFill(Color.GRAY);
        gc.fillRect(0, 0, c.getWidth(), c.getHeight());
        gc.setStroke(Color.BLACK);
        gc.strokeLine(87.5, 0, 87.5, 550);
        gc.strokeLine(175, 0, 175, 550);
        gc.strokeLine(262.5, 0, 262.5, 550);
        gc.strokeLine(350, 0, 350, 550);
        gc.strokeLine(437.5, 0, 437.5, 550);
        gc.strokeLine(525, 0, 525, 550);
        gc.strokeLine(612.5, 0, 612.5, 550);

        gc.strokeLine(0, 68.75, 700, 68.75);
        gc.strokeLine(0, 137.5, 700, 137.5);
        gc.strokeLine(0, 206.25, 700, 206.25);
        gc.strokeLine(0, 275, 700, 275);
        gc.strokeLine(0, 343.75, 700, 343.75);
        gc.strokeLine(0, 412.5, 700, 412.5);
        gc.strokeLine(0, 481.25, 700, 481.25);

        checkersArrayList = new ArrayList<>();

        // draws the initial black checker pieces and adds them to the arraylist
        BlackCheckerPiece bP1 = new BlackCheckerPiece(15, 490, 1);
        bP1.draw(gc);
        checkersArrayList.add(bP1);
        BlackCheckerPiece bP3 = new BlackCheckerPiece(200, 490, 1);
        bP3.draw(gc);
        checkersArrayList.add(bP3);
        BlackCheckerPiece bP6 = new BlackCheckerPiece(365, 490, 1);
        bP6.draw(gc);
        checkersArrayList.add(bP6);
        BlackCheckerPiece bP8 = new BlackCheckerPiece(540, 490, 1);
        bP8.draw(gc);
        checkersArrayList.add(bP8);

        BlackCheckerPiece bP9 = new BlackCheckerPiece(15, 352.5, 1);
        bP9.draw(gc);
        checkersArrayList.add(bP9);
        BlackCheckerPiece bP10 = new BlackCheckerPiece(102.5, 421.25, 1);
        bP10.draw(gc);
        checkersArrayList.add(bP10);
        BlackCheckerPiece bP11 = new BlackCheckerPiece(200, 352.5, 1);
        bP11.draw(gc);
        checkersArrayList.add(bP11);
        BlackCheckerPiece bP12 = new BlackCheckerPiece(277.5, 421.25, 1);
        bP12.draw(gc);
        checkersArrayList.add(bP12);
        BlackCheckerPiece bP13 = new BlackCheckerPiece(365, 352.5, 1);
        bP13.draw(gc);
        checkersArrayList.add(bP13);
        BlackCheckerPiece bP14 = new BlackCheckerPiece(452.5, 421.25, 1);
        bP14.draw(gc);
        checkersArrayList.add(bP14);
        BlackCheckerPiece bP15 = new BlackCheckerPiece(540, 352.5, 1);
        bP15.draw(gc);
        checkersArrayList.add(bP15);
        BlackCheckerPiece bP16 = new BlackCheckerPiece(627.5, 421.25, 1);
        bP16.draw(gc);
        checkersArrayList.add(bP16);

        // draws initial red pieces and adds each to the arraylist
        RedCheckerPiece rP2 = new RedCheckerPiece(102.5, 8.75, 1);
        rP2.draw(gc);
        checkersArrayList.add(rP2);
        RedCheckerPiece rP4 = new RedCheckerPiece(277.5, 8.75, 1);
        rP4.draw(gc);
        checkersArrayList.add(rP4);
        RedCheckerPiece rP6 = new RedCheckerPiece(452.5, 8.75, 1);
        rP6.draw(gc);
        checkersArrayList.add(rP6);
        RedCheckerPiece rP8 = new RedCheckerPiece(627.5, 8.75, 1);
        rP8.draw(gc);
        checkersArrayList.add(rP8);

        RedCheckerPiece rP9 = new RedCheckerPiece(15, 77.5, 1);
        rP9.draw(gc);
        checkersArrayList.add(rP9);
        RedCheckerPiece rP10 = new RedCheckerPiece(102.5, 146.25, 1);
        rP10.draw(gc);
        checkersArrayList.add(rP10);
        RedCheckerPiece rP11 = new RedCheckerPiece(200, 77.5, 1);
        rP11.draw(gc);
        checkersArrayList.add(rP11);
        RedCheckerPiece rP12 = new RedCheckerPiece(277.5, 146.25, 1);
        rP12.draw(gc);
        checkersArrayList.add(rP12);
        RedCheckerPiece rP13 = new RedCheckerPiece(365, 77.5, 1);
        rP13.draw(gc);
        checkersArrayList.add(rP13);
        RedCheckerPiece rP14 = new RedCheckerPiece(452.5, 146.25, 1);
        rP14.draw(gc);
        checkersArrayList.add(rP14);
        RedCheckerPiece rP15 = new RedCheckerPiece(540, 77.5, 1);
        rP15.draw(gc);
        checkersArrayList.add(rP15);
        RedCheckerPiece rP16 = new RedCheckerPiece(627.5, 146.25, 1);
        rP16.draw(gc);
        checkersArrayList.add(rP16);


        GUIComponents(root);
        configureGUIComponents();

        remove.setOnAction(this::myRemoveHandler);
        add.setOnAction(this::myAddHandler);
        blackPiece.setOnAction(this::myBlackCheckerHandler);
        redPiece.setOnAction(this::myRedCheckerHandler);
        c.addEventHandler(MouseEvent.MOUSE_PRESSED, this::pressHandler);


        stage.show();
    }


    /**
     * Make no changes here.
     *
     * @param args unused
     */
    public static void main(String[] args) {
        launch(args);
    }
}

