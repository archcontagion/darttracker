<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Score;
use Illuminate\Support\Carbon;

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
            'round_number' => $request->input('round_number'),
            'set_number' => $request->input('set_number'),
            'leg_number' => $request->input('leg_number'), 
            'throw_nomber' => $request->input('throw_number'),
            'throw_score' => $request->input('throw_score'),
            'session_id' => $request->input('session_id'),
            'player_id' => $request->input('player_id'),   
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

        $requestdata['updated_at'] = Carbon::now();

        $score = Score::where('score_id',$id)->update($requestdata);


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
