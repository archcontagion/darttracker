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
            'round_number' => $request->input('rounds'),
            'set_number' => $request->input('sets'),
            'leg_number' => $request->input('legs'), 
            'throw_nomber' => $request->input('throws'),
            'throw_score' => $request->input('throwscore'),
            'session_id' => $request->input('sessionid'),
            'player_id' => $request->input('playerid'),   
        ]);

        return response()->json($score, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Score::where('score_id', $id)->first();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $requestdata = $request->all(); 

        $requestdata['updated_at'] = date('Y-m-d');

         $score= Score::where('score_id',$id)->update($requestdata);

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
