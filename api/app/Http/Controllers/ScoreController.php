<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Score;

class ScoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Score::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $score = Score::create([
            'RoundNumber' => $request->input('rounds'),
            'SetNumber' => $request->input('sets'),
            'LegNumber' => $request->input('legs'), 
            'ThrowNumber' => $request->input('throws'),
            'ThrowScore' => $request->input('throwscore'),
            'SessionID' => $request->input('sessionid'),
            'PlayerID' => $request->input('playerid'),   
        ]);

        return response()->json($score, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Score::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $requestdata = $request->all(); 

        $requestdata['date_created'] = date('Y-m-d');

         $score= Score::where('id',$id)->update($requestdata);

        if ($score) {

            return 'true';

        }else{

            return 'false';

        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return Score::destroy($id);
    }
}
