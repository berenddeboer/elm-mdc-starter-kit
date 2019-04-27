module Main exposing (..)

import Browser
import Html exposing (Html, text)
import Material
import Material.Options as Options exposing (styled, cs)
import Material.LayoutGrid as LayoutGrid exposing (cell, span1Phone, span2Phone)
import Material.Button as Button
import Material.Snackbar as Snackbar



-- MODEL

type alias Model =
    { mdc : Material.Model Msg
    }


defaultModel : Model
defaultModel =
    { mdc = Material.defaultModel
    }


type Msg
    = Mdc (Material.Msg Msg)
    | Click


main : Program () Model Msg
main =
    Browser.element
        { init = \_ -> init
        , subscriptions = subscriptions
        , update = update
        , view = view
        }


init : ( Model, Cmd Msg )
init =
    ( defaultModel, Material.init Mdc )



-- UPDATE

subscriptions : Model -> Sub Msg
subscriptions model =
    Material.subscriptions Mdc model


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Mdc msg_ ->
            Material.update Mdc msg_ model

        Click ->
            toast model "You clicked me!"


{-| Helper function to show a toast message.
-}
toast : Model -> String -> ( Model, Cmd Msg )
toast model message =
    let
        contents =
            Snackbar.toast Nothing message
        ( mdc, effects ) =
            Snackbar.add Mdc "my-snackbar" contents model.mdc
    in
        ( { model | mdc = mdc }
        , effects
        )




-- VIEW

view : Model -> Html Msg
view model =
    styled Html.div [ cs "mdc-typography" ]
        [ LayoutGrid.view []
              [ cell [ span1Phone ] []
              , cell [ span2Phone ]
                  [ Button.view Mdc
                          "my-button"
                          model.mdc
                          [ Button.ripple
                          , Button.raised
                          , Options.onClick Click
                          ]
                          [ text "Click me!" ]
                    , viewSnackbar model
                    ]
              , cell [span1Phone ] []
              ]
        ]


viewSnackbar : Model -> Html Msg
viewSnackbar model =
    Snackbar.view Mdc "my-snackbar" model.mdc [] []
